import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { story } from '../src/content/index.ts';
import media from '../src/content/history-media.json' with { type: 'json' };

test('All 36 scenes and 12 history cards have relevant bundled media and image sources', () => {
  assert.equal(media.stages.length, 12);
  assert.equal(new Set(media.stages.map(stage => stage.order)).size, 12);
  const assets = new Map(media.assets.map(asset => [asset.id, asset]));
  for (const scene of story.scenes) {
    const stage = media.stages.find(stage => stage.order === scene.order);
    assert(stage, `Missing media: ${scene.id}`);
    assert(stage.assetIds.length > 0 && stage.assetIds.includes(stage.backgroundId));
    assert(stage.backgroundNote.length > 20, `Missing background context: ${scene.id}`);
    assert(stage.assetIds.every(id => assets.has(id)), `Unknown image: ${scene.id}`);
    assert(story.historyCards.some(card => card.id === scene.historyId && card.order === stage.order));
  }
  assert.deepEqual(new Set(media.stages.flatMap(stage => stage.assetIds)), new Set(assets.keys()));
});

test('Every historical image includes provenance and valid, compact WebP files', () => {
  assert.equal(media.assets.length, 25);
  assert.equal(new Set(media.assets.map(asset => asset.id)).size, 25);
  for (const asset of media.assets) {
    assert(asset.title && asset.description && asset.caption && asset.period && asset.caution);
    assert(asset.source.name && asset.source.title && asset.source.rights);
    assert.equal(new URL(asset.source.url).protocol, 'https:');
    assert.match(asset.original.sha256, /^[a-f0-9]{64}$/);
    assert(asset.width <= asset.original.width && asset.height <= asset.original.height);
    for (const path of new Set([asset.src, asset.largeSrc])) {
      assert.match(path, /^images\/history\/LS\d{2}(-large)?\.webp$/);
      const file = new URL(`../public/${path}`, import.meta.url);
      const bytes = readFileSync(file);
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
      assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
      const budget = path === asset.src ? 500_000 : 2_500_000;
      assert(statSync(file).size < budget, `Image too heavy: ${asset.id}`);
    }
  }
});

test('Later newspapers and undated locations retain explicit chronology for learners', () => {
  const leParia = media.assets.find(asset => asset.id === 'LS15')!;
  const thanhNien = media.assets.find(asset => asset.id === 'LS21')!;
  const paris = media.assets.find(asset => asset.id === 'LS06')!;
  assert.match(leParia.caption, /số 2.*1\/5\/1922/);
  assert.match(thanhNien.caption, /3\/10\/1926.*21\/6\/1925/);
  assert.match(paris.caption, /1900.*1910/);
  assert.match(media.stages.find(stage => stage.order === 10)!.backgroundNote, /chưa xác định ngày chụp/);
});
