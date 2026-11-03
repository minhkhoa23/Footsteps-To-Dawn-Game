import assert from 'node:assert/strict';
import { test } from 'node:test';
import { story, sceneById, campaignById } from '../src/content/index.ts';
import type { CampaignId } from '../src/content/index.ts';
import { advance, choose, conditionalDialogue, endingType, enterRun, freshSave, loadSave, parseSave, persistSave, startCampaign } from '../src/engine.ts';
import type { Save } from '../src/engine.ts';

const paths = {
  I: { good:'ABDACBDC BADC'.replaceAll(' ',''), bad:'DDCDAAAADBAA' },
  II:{ good:'CABDBDABCDAB', bad:'DCACAABDBACA' },
  III:{ good:'BDACDACDABCD', bad:'DBDAABACDABA' }
};
function play(save: Save, campaign: CampaignId, path: string, shuffle = false) {
  save = startCampaign({...save,settings:{...save.settings,shuffle}},campaign,`${campaign}-${save.runs.length}`,()=>.25);
  save = enterRun(save);
  for (const label of path) {
    const scene=sceneById[save.current!.sceneId];
    save=choose(save,scene.id,scene.choices.find(c=>c.originalLabel===label)!.id);
    save=advance(save,scene.id);
  }
  return save;
}
function unlocked(campaign: CampaignId) {
  let save=freshSave();
  for (const c of story.campaigns) { if(c.id===campaign)break;save=play(save,c.id,paths[c.id].good); }
  return save;
}

test('Content has 3 distinct campaigns, 36 scenes, 144 choices, 12 history cards and 9 endings',()=>{
  assert.equal(story.campaigns.length,3);assert.equal(story.scenes.length,36);assert.equal(story.historyCards.length,12);assert.equal(story.endings.length,9);
  assert.equal(new Set(story.scenes.flatMap(s=>s.choices.map(c=>c.id))).size,144);
  assert.equal(new Set(story.scenes.map(s=>s.title)).size,36);
  for(const campaign of story.campaigns){
    assert.equal(campaign.sceneIds.length,12);
    campaign.sceneIds.forEach((id,i)=>{
      const s=sceneById[id];assert.equal(s.order,i+1);assert.equal(s.choices.length,4);assert.equal(s.nextSceneId,campaign.sceneIds[i+1]||null);
      assert(s.lead&&s.dialogue.text&&s.context&&s.hotspots.length>=2);
      if(s.type==='KT'){assert.equal(s.choices.filter(c=>c.correct).length,1);assert(s.choices.every(c=>c.points===(c.correct?2:0)));}
      else assert.deepEqual(s.choices.map(c=>c.points).sort(),[-1,0,1,2]);
      assert(s.choices.every(c=>c.feedback&&c.itemChange));
      assert(story.historyCards.some(c=>c.id===s.historyId&&c.sources.length));
    });
  }
});

for(const campaign of story.campaigns){
  for(const shuffle of [false,true]){
    test(`${campaign.id}: approved Good path = 24, Bad path = -7; shuffled=${shuffle}`,()=>{
      const base=unlocked(campaign.id);
      const good=play(base,campaign.id,paths[campaign.id].good,shuffle);
      assert.equal(good.current!.score,24);assert.equal(good.current!.phase,'complete');assert(good.collection.includes(`${campaign.id}-good`));
      const bad=play(base,campaign.id,paths[campaign.id].bad,shuffle);
      assert.equal(bad.current!.score,-7);assert.equal(bad.current!.journal.length,12);assert(bad.collection.includes(`${campaign.id}-bad`));
      assert.deepEqual(parseSave(JSON.stringify(good)),good);assert.deepEqual(parseSave(JSON.stringify(bad)),bad);
    });
  }
  test(`${campaign.id}: 22 and 20 points cannot replace K6 / K12`,()=>{
    const base=unlocked(campaign.id); const letters=paths[campaign.id].good.split('');
    const six=sceneById[campaign.sceneIds[5]];letters[5]=six.choices.find(c=>!c.correct)!.originalLabel;
    const onlySix=play(base,campaign.id,letters.join(''));assert.equal(onlySix.current!.score,22);assert(onlySix.collection.includes(`${campaign.id}-neutral`));
    letters[11]=sceneById[campaign.sceneIds[11]].choices.find(c=>!c.correct)!.originalLabel;
    const both=play(base,campaign.id,letters.join(''));assert.equal(both.current!.score,20);assert(both.collection.includes(`${campaign.id}-neutral`));
  });
}

test('Ending boundaries 7/8 and 17/18, all knowledge flag combinations',()=>{
  for(const a of [true,false])for(const b of [true,false]){
    assert.equal(endingType(7,a,b),'bad');assert.equal(endingType(8,a,b),'neutral');assert.equal(endingType(17,a,b),'neutral');
    assert.equal(endingType(18,a,b),a&&b?'good':'neutral');
    for(let score=-12;score<=24;score++) assert(['good','neutral','bad'].includes(endingType(score,a,b)));
  }
});
test('Duplicate choices, stale scene clicks and repeated advance are idempotent',()=>{
  let save=enterRun(startCampaign(freshSave(),'I','idempotent'));
  const first=sceneById['I-01'];save=choose(save,first.id,first.choices[0].id);
  assert.strictEqual(choose(save,first.id,first.choices[1].id),save);
  save=parseSave(JSON.stringify(save));assert.equal(save.current!.phase,'consequence');assert.equal(save.current!.score,2);
  assert.strictEqual(choose(save,first.id,first.choices[0].id),save);
  save=advance(save,first.id);assert.equal(save.current!.sceneId,'I-02');
  assert.strictEqual(advance(save,first.id),save);assert.strictEqual(choose(save,first.id,first.choices[1].id),save);
  assert.strictEqual(choose(save,'I-02','non-existent'),save);assert.equal(save.current!.score,2);
});
test('Every option in all 36 scenes converges without ending early',()=>{
  for(const campaign of story.campaigns){
    let before=enterRun(startCampaign(unlocked(campaign.id),campaign.id,'branches'));
    for(const id of campaign.sceneIds){
      const scene=sceneById[id];
      for(const choice of scene.choices){
        const result=advance(choose(before,id,choice.id),id);
        assert.equal(result.current!.sceneId,scene.nextSceneId||id);
        assert.equal(result.current!.phase,scene.order===12?'complete':'choice');
        assert.equal(result.current!.journal.length,scene.order);
      }
      before=advance(choose(before,id,scene.choices.find(c=>c.points===2)!.id),id);
    }
  }
});
test('All Good / Neutral / Bad results unlock next campaign and preserve collections',()=>{
  for(const kind of ['good','neutral','bad'] as const){
    let save=freshSave();
    for(const campaign of story.campaigns){
      const path=kind==='bad'?paths[campaign.id].bad:kind==='neutral'?paths[campaign.id].good.slice(0,5)+sceneById[campaign.sceneIds[5]].choices.find(c=>!c.correct)!.originalLabel+paths[campaign.id].good.slice(6):paths[campaign.id].good;
      save=play(save,campaign.id,path);
      assert(save.collection.includes(`${campaign.id}-${kind}`));assert.equal(save.runs.length,story.campaigns.indexOf(campaign)+1);
      const next=story.endings.find(e=>e.id===`${campaign.id}-${kind}`)!.nextCampaignId;if(next)assert(save.unlocked.includes(next));
      assert.deepEqual(parseSave(JSON.stringify(save)),save);
    }
    const replay=startCampaign(save,'I','replay');assert.equal(replay.current!.score,0);assert.equal(replay.current!.k6,null);assert.equal(replay.current!.k12,null);assert.equal(replay.collection.length,3);assert.equal(replay.runs.length,3);
  }
});
test('Shuffled semantic IDs and exact consequence phase survive a reload',()=>{
  let save=enterRun(startCampaign({...freshSave(),settings:{...freshSave().settings,shuffle:true}},'I','shuffled',()=>.4));
  const order=[...save.current!.optionOrders['I-01']];
  save=choose(save,'I-01',order[2]);const restored=parseSave(JSON.stringify(save));
  assert.deepEqual(restored.current!.optionOrders['I-01'],order);assert.equal(restored.current!.choices['I-01'],order[2]);assert.equal(restored.current!.phase,'consequence');
});
test('Locked campaigns cannot start and incomplete runs cannot finish',()=>{
  const initial=freshSave();assert.strictEqual(startCampaign(initial,'II'),initial);
  const save=enterRun(startCampaign(initial,'I'));assert.strictEqual(advance(save,'I-01'),save);assert.equal(save.runs.length,0);
});
test('Save validation rejects corruption, unknown versions and inconsistent derived state',()=>{
  const valid=play(freshSave(),'I',paths.I.good);
  assert.throws(()=>parseSave('not json'));assert.throws(()=>parseSave('{"version":999}'));
  for(const mutate of [
    (s:Save)=>{s.current!.score=25;},(s:Save)=>{s.current!.k6=false;},(s:Save)=>{s.current!.sceneId='II-01';},
    (s:Save)=>{s.current!.optionOrders['I-01']=['x','x','x','x'];},(s:Save)=>{s.current!.choices['I-01']='missing';},
    (s:Save)=>{s.collection.push('III-good');},(s:Save)=>{s.unlocked.push('III');},(s:Save)=>{s.current!.journal.reverse();},
    (s:Save)=>{s.current!.items['I-01'].state='edited';},(s:Save)=>{s.settings.sound='yes' as unknown as boolean;},
  ]){const copy=structuredClone(valid);mutate(copy);assert.throws(()=>parseSave(JSON.stringify(copy)));}
});
test('Broken / blocked storage remains recoverable and play continues in memory',()=>{
  const raw='{broken';const invalid=loadSave({getItem:()=>raw});assert.equal(invalid.raw,raw);assert.equal(invalid.writable,false);assert(invalid.notice);
  const old=loadSave({getItem:()=>'{"version":0}'});assert.equal(old.writable,false);assert(old.notice.includes('Phiên bản'));
  const blocked=loadSave({getItem:()=>{throw new Error('blocked');}});assert.equal(blocked.save.current,null);
  assert(persistSave({setItem:()=>{throw new Error('quota');}},freshSave())?.includes('trong phiên'));
  const playable=enterRun(startCampaign(blocked.save,'I'));assert.equal(choose(playable,'I-01',sceneById['I-01'].choices[0].id).current!.score,2);
});
test('Cross-scene callbacks use previous semantic choice, and do not alter scores',()=>{
  let save=enterRun(startCampaign(freshSave(),'I'));
  for(let i=0;i<3;i++){const s=sceneById[save.current!.sceneId];save=advance(choose(save,s.id,s.choices.find(c=>c.points===2)!.id),s.id);}
  const score=save.current!.score;assert(conditionalDialogue(save.current!)[0].includes('ghi chép đối chiếu'));assert.equal(save.current!.score,score);
});
