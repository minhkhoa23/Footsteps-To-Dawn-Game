import { useEffect, useRef, useState } from 'react';
import { story, sceneById, campaignById, inheritedText } from './content';
import type { CampaignId, Ending, Scene } from './content';
import { advance, choose, conditionalDialogue, endingType, enterRun, freshSave, keyMoments, loadSave, parseSave, persistSave, reviewScenes, SAVE_KEY, startCampaign, touch } from './engine';
import type { Run, Save, Settings } from './engine';
import { Icon } from './components/Icon';
import { HarborScene } from './components/HarborScene';
import { Portrait, SceneArt } from './components/SceneArt';
import { HistoricalGallery, SceneImageCredit } from './components/HistoricalMedia';
import { MuseumDashboard } from './components/MuseumDashboard';
import { Dialog } from './components/Dialog';
import { createAmbience, playChoiceSound } from './audio';

type Modal = 'about' | 'guide' | 'history' | 'settings' | 'journeys' | 'journal' | 'collection' | 'pause' | 'map' | 'object' | 'endingDetail' | null;
type DashboardTab = 'all' | 'game' | 'museum';
type Confirmation = { title: string; text: string; action: () => void } | null;
function download(text: string, name: string) {
  const url = URL.createObjectURL(new Blob([text], {type:'application/json;charset=utf-8'}));
  const a = document.createElement('a'); a.href=url; a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function Brand({ compact = false, onClick }: { compact?: boolean; onClick: () => void }) {
  return <button className={`brand ${compact ? 'compact' : ''}`} onClick={onClick} aria-label="Về trang chủ"><span className="brand-seal"><Icon name="compass" size={compact ? 19 : 24} /></span><span><b>HÀNH TRÌNH</b><small>TÌM ĐƯỜNG CỨU NƯỚC</small></span></button>;
}
function Empty({ title, text }: { title: string; text: string }) { return <div className="empty-state"><Icon name="book" size={36} /><b>{title}</b><p>{text}</p></div>; }

export default function App() {
  const [loaded] = useState(() => loadSave({getItem: key => localStorage.getItem(key)}));
  const [save, setSave] = useState<Save>(loaded.save);
  const [writable, setWritable] = useState(loaded.writable);
  const [notice, setNotice] = useState(loaded.notice);
  const [modal, setModal] = useState<Modal>(null);
  const [confirmation, setConfirmation] = useState<Confirmation>(null);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [objectIndex, setObjectIndex] = useState(0);
  const [journalTab, setJournalTab] = useState<'choices'|'items'|'runs'|'practice'>('choices');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('all');
  const [practiceChoice, setPracticeChoice] = useState<Record<string,string>>({});
  const [detailEnding, setDetailEnding] = useState<Ending | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const run = save.current; const scene = run ? sceneById[run.sceneId] : story.scenes[0];
  const campaign = campaignById[run?.campaignId || 'I'];
  const selected = run ? scene.choices.find(c => c.id === run.choices[scene.id]) : undefined;
  const resultEnding = run?.phase === 'complete' ? story.endings.find(e => e.id === `${run.campaignId}-${endingType(run.score,run.k6,run.k12)}`)! : null;
  const [saved, setSaved] = useState(false);
  const [pageVisible,setPageVisible] = useState(!document.hidden);

  useEffect(() => {
    document.documentElement.dataset.largeText=String(save.settings.largeText);
    document.documentElement.dataset.reducedMotion=String(save.settings.reducedMotion);
  }, [save.settings.largeText,save.settings.reducedMotion]);
  useEffect(() => {
    const visibility=()=>setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange',visibility);
    return ()=>document.removeEventListener('visibilitychange',visibility);
  }, []);

  useEffect(() => {
    if (!writable) { setSaved(false); return; }
    const error = persistSave({setItem:(key,value)=>localStorage.setItem(key,value)}, save);
    setSaved(!error); if (error) setNotice(error);
  }, [save,writable]);
  useEffect(() => {
    if (save.view !== 'game' || !save.settings.sound || modal === 'pause' || !pageVisible) return;
    const ambience = createAmbience();
    return () => { ambience?.stop(); };
  }, [save.settings.sound,save.view,modal,pageVisible]);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => { if (e.key==='Escape' && !modal && !confirmation && save.view==='game') setModal('pause'); };
    window.addEventListener('keydown',listener); return ()=>window.removeEventListener('keydown',listener);
  }, [modal,confirmation,save.view]);
  useEffect(() => { if (save.view==='game') heading.current?.focus({preventScroll:true}); }, [run?.sceneId,save.view]);
  useEffect(() => {
    const changed = (event: StorageEvent) => {
      if (event.key !== SAVE_KEY || event.newValue === JSON.stringify(save)) return;
      setWritable(false); setSaved(false); setNotice('Hành trình vừa thay đổi ở một tab khác. Hãy tải lại để dùng bản mới nhất, hoặc xuất lượt trong tab này trước khi tiếp tục.');
    };
    window.addEventListener('storage',changed); return ()=>window.removeEventListener('storage',changed);
  }, [save]);

  function update(action: (s: Save) => Save) { setSave(s=>touch(action(s))); }
  function home() { update(s=>({...s,view:'home'})); setModal(null); }
  function focusMuseum() {
    if (dashboardTab === 'game') setDashboardTab('all');
    setTimeout(() => {
      document.getElementById('museum-dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  }
  function focusGame() {
    if (dashboardTab === 'museum') setDashboardTab('all');
    setTimeout(() => {
      document.getElementById('game-dashboard-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  }
  function resume() { update(enterRun); setModal(null); }
  function openHistory(index = scene.order-1) { setHistoryIndex(index); setModal('history'); }
  function begin(id: CampaignId, restart = false) {
    if (!save.unlocked.includes(id)) return;
    if (run?.campaignId === id && run.phase !== 'complete' && !restart) { resume(); return; }
    const action = () => { update(s=>startCampaign(s,id)); setModal(null); setConfirmation(null); window.scrollTo(0,0); };
    if (run && run.phase !== 'complete') setConfirmation({title:'Bắt đầu lượt mới?',text:`Lượt ${campaign.name}, màn ${scene.order}/12 sẽ được thay bằng lượt mới. Các lựa chọn của lượt đang chơi sẽ bị xóa. Bộ sưu tập, lịch sử lượt đã hoàn thành và các tuyến đã mở vẫn được giữ.`,action});
    else action();
  }
  function setting(key: keyof Settings) { update(s=>({...s,settings:{...s.settings,[key]:!s.settings[key]}})); }
  function exportSave() { download(JSON.stringify(save,null,2),`hanh-trinh-${new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Ho_Chi_Minh'})}.json`); }
  async function importSave(file: File | undefined) {
    if (!file) return;
    try {
      const incoming = parseSave(await file.text());
      setConfirmation({title:'Nhập hành trình đã lưu?',text:'Bản lưu đã được kiểm tra. Nhập tệp sẽ thay toàn bộ tiến trình, cài đặt và bộ sưu tập hiện tại bằng dữ liệu trong tệp. Bạn có thể hủy để xuất bản hiện tại trước.',action:()=>{setSave(incoming);setWritable(true);setNotice('Đã nhập bản lưu.');setModal(null);setConfirmation(null);}});
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Không thể đọc tệp này.'); }
    if (fileInput.current) fileInput.current.value='';
  }
  function answer(choiceId: string) {
    if (selected || !run || run.phase!=='choice') return;
    if (save.settings.sound) playChoiceSound();
    update(s=>choose(s,scene.id,choiceId));
  }
  function next() { update(s=>advance(s,scene.id)); window.scrollTo({top:0,behavior:'instant'}); }
  const modalTitles: Record<Exclude<Modal,null>,string> = {about:'Một hành trình, ba góc nhìn',guide:'Cách bước vào câu chuyện',history:'Thẻ lịch sử & nguồn tư liệu',settings:'Cài đặt hành trình',journeys:'Chọn hành trình',journal:'Nhật ký của An',collection:'Chín góc kết của câu chuyện',pause:'Dừng chân một chút',map:'Bản đồ hành trình',object:scene.hotspots[objectIndex].name,endingDetail:detailEnding?.title || 'Kết thúc'};
  const allRuns: Run[] = [...save.runs.filter(r=>r.id!==run?.id),...(run ? [run] : [])];

  return <>
    <main id="application" className={`${save.settings.largeText ? 'large-text' : ''} ${save.settings.reducedMotion ? 'reduce-motion' : ''}`}>
      <a className="skip-link" href="#main-content">Đi tới nội dung chính</a>
      {notice && <aside className="save-notice" role="status"><Icon name="info" /><div>{notice}{!writable && <div className="notice-actions"><button onClick={()=>download(loaded.raw || JSON.stringify(save),'ban-luu-can-khoi-phuc.json')}>Tải bản lưu gốc</button><button onClick={()=>location.reload()}>Tải lại</button><button onClick={()=>setConfirmation({title:'Tạo bản lưu mới?',text:'Bản lưu trên trình duyệt sẽ được thay bằng hành trình đang hiển thị. Hãy tải bản gốc nếu bạn cần giữ dữ liệu cũ.',action:()=>{setWritable(true);setNotice('');setConfirmation(null);}})}>Dùng hành trình hiện tại</button></div>}</div><button onClick={()=>{if(writable)setNotice('');else exportSave();}} aria-label={writable ? 'Đóng thông báo' : 'Xuất hành trình hiện tại'}><Icon name={writable ? 'close' : 'book'} /></button></aside>}

      {save.view==='home' && <div className="home-page">
        <header className="site-header"><Brand onClick={home} /><nav aria-label="Điều hướng chính"><button onClick={focusMuseum}>Bảo tàng &amp; Nhóm</button><button onClick={focusGame}>Trò chơi 1911–1930</button><button onClick={()=>setModal('about')}>Giới thiệu</button><button onClick={()=>openHistory(0)}>Nguồn tư liệu</button><button className="icon-button mobile-about" onClick={()=>setModal('about')} aria-label="Giới thiệu và tư liệu"><Icon name="info" /></button><button className="icon-button" onClick={()=>setModal('settings')} aria-label="Cài đặt"><Icon name="gear" /></button></nav></header>
        <div className="dashboard-mode-bar" role="navigation" aria-label="Chế độ hiển thị Dashboard">
          <div className="dashboard-mode-inner">
            <span className="dashboard-mode-label"><Icon name="compass" size={15} /> Không gian Dashboard:</span>
            <div className="dashboard-mode-pills" role="tablist" aria-label="Chọn nội dung Dashboard">
              <button role="tab" aria-selected={dashboardTab==='all'} className={dashboardTab==='all' ? 'active' : ''} onClick={()=>setDashboardTab('all')}>Tổng quan (Bảo tàng &amp; Trò chơi)</button>
              <button role="tab" aria-selected={dashboardTab==='museum'} className={dashboardTab==='museum' ? 'active' : ''} onClick={()=>setDashboardTab('museum')}>Bảo tàng Chứng tích Chiến tranh · Nhóm</button>
              <button role="tab" aria-selected={dashboardTab==='game'} className={dashboardTab==='game' ? 'active' : ''} onClick={()=>setDashboardTab('game')}>Trò chơi Lịch sử (1911–1930)</button>
            </div>
          </div>
        </div>

        {/* PHẦN 1 (ĐƯA LÊN TRƯỚC): GIỚI THIỆU BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH & CHUYẾN ĐI CỦA NHÓM */}
        {dashboardTab !== 'game' && (
          <div id="main-content">
            <MuseumDashboard
              save={save}
              onStartCampaign={id => begin(id)}
              onResumeGame={resume}
              onOpenHistory={openHistory}
              onOpenJournal={() => setModal('journal')}
              onOpenCollection={() => setModal('collection')}
              onOpenJourneys={() => setModal('journeys')}
              onScrollToGame={focusGame}
            />
          </div>
        )}

        {/* PHẦN 2 (PHÍA DƯỚI): NỘI DUNG TRÒ CHƠI HÀNH TRÌNH TÌM ĐƯỜNG CỨU NƯỚC */}
        {dashboardTab !== 'museum' && (
          <div id="game-dashboard-section" className="game-dashboard-block">
            <section id={dashboardTab === 'game' ? 'main-content' : undefined} className="home-hero">
              <div className="hero-art-wrap"><HarborScene /><div className="art-caption"><span>MINH HỌA</span> Bến cảng Sài Gòn, 1911</div><button className="hotspot h1" onClick={()=>openHistory(1)} aria-label="Khám phá chuyến tàu năm 1911"><span>+</span></button><button className="hotspot h2" onClick={()=>{setObjectIndex(1);setModal('object');}} aria-label="Khám phá chiếc túi của An"><span>+</span></button></div>
              <div className="hero-content"><div className="eyebrow"><i />TRÒ CHƠI KỂ CHUYỆN LỊCH SỬ<i /></div><h1>Hành trình<br /><em>tìm đường cứu nước</em></h1><p className="hero-lead">Theo bước An — một thanh niên trẻ đi qua những bến cảng, trang sách và câu hỏi lớn của thời đại.</p><div className="meta-row"><span><Icon name="compass" />3 hành trình</span><span><Icon name="book" />36 màn chơi</span><span><Icon name="pause" />20–30 phút / hành trình</span></div>
                <div className="hero-actions"><button className="primary-button" onClick={()=>run ? resume() : begin('I')}><span className="button-icon"><Icon name={run ? 'arrow' : 'play'} /></span>{run ? run.phase==='complete' ? 'Xem lại kết thúc' : `Tiếp tục · Màn ${scene.order}/12` : 'Bắt đầu hành trình'}<Icon name="arrow" /></button><button className="text-button" onClick={()=>setModal('journeys')}><Icon name="map" />Chọn hành trình<Icon name="chevron" size={16} /></button><button className="text-button" onClick={focusMuseum}><Icon name="spark" />Lên phần Bảo tàng &amp; Nhóm<Icon name="chevron" size={16} /></button></div>
                <blockquote>“Điều An mang theo không chỉ là một chiếc túi nhỏ, mà là một câu hỏi chưa có lời đáp.”</blockquote><button className="text-button how-link" onClick={()=>setModal('guide')}>Lần đầu ghé đến? Xem cách chơi <Icon name="arrow" size={14} /></button>
              </div>
            </section>
            <section className="home-footer" aria-label="Hành trang của bạn"><button onClick={focusMuseum}><Icon name="compass" /><span><b>Bảo tàng Chứng tích Chiến tranh</b><small>6 chuyên đề &amp; 30 ảnh thực tế của nhóm</small></span><Icon name="chevron" /></button><button onClick={()=>setModal('journal')}><Icon name="book" /><span><b>Nhật ký kiến thức</b><small>{run ? `${run.journal.length} lựa chọn trong lượt hiện tại` : 'Những điều đã khám phá'}</small></span><Icon name="chevron" /></button><button onClick={()=>setModal('collection')}><Icon name="spark" /><span><b>Bộ sưu tập kết thúc</b><small>{save.collection.length ? `${save.collection.length} / 9 góc kết đã mở` : 'Những trang cuối đang chờ bạn'}</small></span><Icon name="chevron" /></button></section>
          </div>
        )}
      </div>}

      {save.view==='intro' && run && <section id="main-content" className="intro-page"><button className="corner-back" onClick={home}>← Trở về</button><div className="intro-card paper-card"><span className="chapter-no">HÀNH TRÌNH {run.campaignId} · LỜI MỞ ĐẦU</span><h1>{campaign.name}</h1><div className="ornament">◆</div>{run.campaignId!=='I' && <p className="new-perspective">Một góc nhìn khác – trở lại điểm khởi đầu</p>}<p className="dropcap">{campaign.opening}</p>{inheritedText(run.inheritedEnding) && <p className="inherited-note">{inheritedText(run.inheritedEnding)} Đây là một đạo cụ gợi nhớ cho góc nhìn mới.</p>}<p>An và những người bạn là nhân vật hư cấu. Các thẻ lịch sử có nguồn giúp bạn phân biệt câu chuyện với những sự kiện có thật trong giai đoạn 1911–1930.</p><HowTo /><button className="primary-button" onClick={resume}>Bước tới bến sông <Icon name="arrow" /></button><p className="local-note">Tự động lưu trên thiết bị và trình duyệt này. Không cần tài khoản.</p></div></section>}

      {save.view==='game' && run && <div className="game-page">
        <header className="game-header"><Brand compact onClick={home} /><div className="journey-title"><span>HÀNH TRÌNH {['I','II','III'].indexOf(run.campaignId)+1}/3</span><b>{campaign.name.toLocaleUpperCase('vi')}</b></div><div className="game-tools"><span className="save-state"><Icon name={saved ? 'check' : 'info'} size={15} />{saved ? 'Đã lưu' : 'Trong phiên'}</span><button onClick={()=>setModal('journal')} aria-label="Nhật ký"><Icon name="book" /></button><button onClick={()=>setting('sound')} aria-label={save.settings.sound ? 'Tắt âm thanh' : 'Bật âm thanh'} aria-pressed={save.settings.sound}><Icon name={save.settings.sound ? 'volume' : 'headphones'} /></button><button onClick={()=>setModal('pause')} aria-label="Tạm dừng"><Icon name="pause" /></button></div></header>
        <div className="progress-strip"><div style={{width:`${scene.order/12*100}%`}} /><span>MÀN {scene.order} / 12 · {scene.time}</span></div>
        <div id="main-content" className="game-layout"><section className="scene-panel" aria-label="Bối cảnh và hội thoại">
          <div className="scene-image"><SceneArt scene={scene} /><div className="scene-grain" /><span className="scene-label"><Icon name="map" size={16} />{scene.time}</span><div className="scene-title"><span>{scene.id}</span><div><small>{scene.place}</small><h2>{scene.title}</h2></div></div></div>
          <SceneImageCredit order={scene.order} onExplore={()=>openHistory()} />
          <div className="scene-underbar"><span>TRUYỆN HƯ CẤU CỦA AN</span><button className="text-button" onClick={()=>setModal('map')}><Icon name="map" size={16} />Bản đồ thời gian</button></div>
          <div className="scene-object-tools" role="group" aria-label="Khám phá đạo cụ trong truyện"><span>Khám phá trong truyện</span>{scene.hotspots.map((object,index)=><button key={object.id} onClick={()=>{setObjectIndex(index);setModal('object');}} aria-label={`Khám phá ${object.name}`}><span aria-hidden="true">+</span>{object.name}</button>)}</div>
          <p className="narration"><span className="decorative-letter">{scene.lead.charAt(0)}</span>{scene.lead.slice(1)}</p><div className="dialogue"><div className="portrait"><Portrait name={scene.dialogue.speaker} /></div><div><b>{scene.dialogue.speaker}</b><p>“{scene.dialogue.text}”</p></div></div>{conditionalDialogue(run).map(text=><p key={text} className="echo-text"><Icon name="book" size={16} />{text}</p>)}<div className="mobile-tools"><button onClick={()=>setModal('journal')}><Icon name="book" />Nhật ký</button><button onClick={()=>setModal('settings')}><Icon name="gear" />Cài đặt</button><small>{saved ? 'Đã lưu trên trình duyệt' : 'Đang chơi trong phiên'}</small></div>
        </section>
          <section className="choice-panel" aria-label="Lựa chọn"><div className="choice-topline"><span><Icon name={scene.type==='KT' ? 'book' : 'compass'} size={15} />{scene.type==='KT' ? 'KT · Kiến thức' : 'TH · Tình huống'}</span><button onClick={()=>openHistory()}><Icon name="info" size={16} />Xem thẻ lịch sử</button></div><h3 ref={heading} tabIndex={-1}>{scene.question}</h3><p className="choice-help">{selected ? 'Lựa chọn đã được ghi lại. Đọc diễn biến trước khi tiếp tục.' : scene.type==='KT' ? 'Có một đáp án đúng. Chọn một phương án để xem giải thích.' : 'Cách làm của An sẽ để lại hệ quả trong nhiệm vụ này.'}</p><div className="options">{run.optionOrders[scene.id].map((id,index)=>{const choice=scene.choices.find(c=>c.id===id)!; const chosen=selected?.id===id; const correct=!!selected && scene.type==='KT' && choice.correct; return <button key={id} onClick={()=>answer(id)} disabled={!!selected} className={`${chosen ? 'selected' : ''} ${correct ? 'correct' : ''} ${selected && !chosen && !correct ? 'dimmed' : ''}`} aria-label={`${String.fromCharCode(65+index)}. ${choice.text}${chosen ? ' — Đã chọn' : ''}${correct ? ' — Đáp án đúng' : ''}`}><span className="option-letter">{String.fromCharCode(65+index)}</span><span>{choice.text}{correct && <small className="correct-label">Đáp án đúng</small>}</span>{chosen && <span className="choice-check"><Icon name="check" size={17} /></span>}</button>;})}</div>
            {selected && <div className={`result-box ${selected.correct ? 'success' : ''}`} role="status" aria-live="polite"><div className="result-heading"><Icon name={scene.type==='KT' ? 'book' : 'spark'} /><b>{scene.type==='KT' ? 'Giải thích kiến thức' : 'Diễn biến của câu chuyện'}</b></div><p>{selected.feedback}</p>{scene.type==='KT' && !selected.correct && <p><strong>Đáp án đúng:</strong> {scene.choices.find(c=>c.correct)!.text}</p>}<p>{scene.explanation}</p><div className="item-update"><Icon name="book" size={15} /><span>{selected.itemChange.title} · {selected.itemChange.state}</span></div><div className="result-footer"><span><Icon name="check" size={15} />Nhật ký đã cập nhật</span><button className="primary-button" onClick={next}>{scene.order===12 ? 'Xem kết quả' : 'Tiếp tục'}<Icon name="arrow" /></button></div></div>}
          </section></div>
      </div>}

      {save.view==='ending' && run && resultEnding && <section id="main-content" className={`ending-page ${resultEnding.type}`}><div className="ending-art"><SceneArt scene={scene} ending variant={resultEnding.type} /><div className="ending-art-note">ENDING HƯ CẤU · NĂM 1930<br />{resultEnding.illustration}</div></div><div className="ending-content paper-card"><span className="chapter-no">HÀNH TRÌNH {run.campaignId} · {resultEnding.type==='neutral' ? 'Neutral ending' : `${resultEnding.type==='good' ? 'Good' : 'Bad'} ending`}</span><h1>{resultEnding.title}</h1><div className="ending-seal"><Icon name={resultEnding.type==='good' ? 'spark' : 'book'} size={30} /></div><p>{resultEnding.text}</p><p className="local-note">Chặng kể dừng ở năm 1930. Phía trước vẫn còn một hành trình dài; kết quả nhiệm vụ của An không làm thay đổi lịch sử.</p><div className="ending-stats"><span><b>12</b>màn đã đi qua</span><span><b>{save.collection.length}/9</b>góc kết đã mở</span><span><b>{reviewScenes(run).length}</b>thẻ nên ôn lại</span></div><h3>Ba khoảnh khắc để nhìn lại</h3><ol className="moment-list">{keyMoments(run).map(({scene:s,choice})=><li key={s.id}><b>{s.id} · {s.title}</b><span>{choice.feedback}</span></li>)}</ol>{reviewScenes(run).length>0 && <div className="review-links">{reviewScenes(run).map(s=><button key={s.id} onClick={()=>openHistory(s.order-1)}><Icon name="book" size={14} />Ôn mốc {s.time}</button>)}</div>}<button className="primary-button" onClick={()=>resultEnding.nextCampaignId ? begin(resultEnding.nextCampaignId) : setModal('journeys')}>{resultEnding.nextCampaignId ? `Góc nhìn tiếp theo · ${campaignById[resultEnding.nextCampaignId].name}` : 'Chọn hành trình để chơi lại'}<Icon name="arrow" /></button><div className="ending-links"><button className="text-button" onClick={()=>setModal('journal')}>Mở nhật ký</button><button className="text-button" onClick={()=>setModal('collection')}>Bộ sưu tập</button><button className="text-button" onClick={home}>Trang chủ</button></div></div></section>}
    </main>

    {modal && <Dialog title={modalTitles[modal]} close={()=>setModal(null)} wide={['map','collection','journal','history'].includes(modal)}>
      {modal==='about' && <><p className="prose-lead">Một chiếc túi nhỏ. Một cuốn sổ. Và câu hỏi về con đường phía trước.</p><p>“Hành trình tìm đường cứu nước” là trò chơi kể chuyện 2D dành cho môn Lịch sử Đảng Cộng sản Việt Nam. Ba lượt kể cùng đi qua giai đoạn 1911–1930, với ba nhiệm vụ khác nhau.</p><div className="character-row">{['An','Bác Tư','Lâm','Mai','Bình'].map(name=><div key={name}><Portrait name={name} /><b>{name}</b></div>)}</div><div className="notice"><Icon name="info" /><div><b>Ranh giới giữa lịch sử và sáng tác</b>An, Bác Tư, Lâm, Mai, Bình và mọi lời thoại, nhiệm vụ, kết thúc của họ là hư cấu. An không phải bí danh của Chủ tịch Hồ Chí Minh. Các sự kiện có thật được trình bày riêng trong thẻ lịch sử kèm nguồn.</div></div><p>Ba loại Good ending, Neutral ending và Bad ending phản ánh kết quả nhiệm vụ của An. Bạn không cần thu thập mọi Bad ending để hoàn thành nội dung học tập.</p><div className="modal-actions"><button className="secondary-button" onClick={()=>setModal('guide')}>Xem cách chơi</button><button className="primary-button" onClick={()=>openHistory(0)}>Đọc nguồn tư liệu <Icon name="arrow" /></button></div><p className="local-note">25 ảnh tư liệu có mô tả, chú thích và nguồn trong thẻ lịch sử. Chân dung nhân vật, đạo cụ và ending là minh họa SVG. Âm thanh tổng hợp tại trình duyệt. Nội dung cốt truyện: phụ lục đã cung cấp.</p></>}
      {modal==='guide' && <><HowTo /><p><b>TH · Tình huống:</b> chọn cách An giải quyết nhiệm vụ. Hệ quả là quy ước trong câu chuyện, không phải phán xét một lựa chọn đời sống.</p><p><b>KT · Kiến thức:</b> có đúng một đáp án phù hợp dữ kiện. Sau chọn, bạn luôn được xem đáp án và giải thích.</p><p>Mỗi màn chỉ ghi nhận lần chọn đầu tiên. Đọc thẻ, mở nhật ký hoặc luyện tập không đổi kết quả lượt đã chốt. Mọi lựa chọn đều cho phép đi đủ 12 màn.</p><p>Dùng Tab để di chuyển, Enter hoặc Space để chọn. Nhấn Esc để tạm dừng hay đóng cửa sổ. Bạn có thể bật chữ lớn và giảm chuyển động trong cài đặt.</p><div className="notice"><Icon name="book" /><div><b>Lưu trên trình duyệt hiện tại</b>Ứng dụng tự lưu sau mỗi lựa chọn và chuyển màn. Xuất bản lưu trong cài đặt để chuyển sang thiết bị khác hoặc giữ bản dự phòng.</div></div><button className="primary-button" onClick={()=>setModal(null)}>Đã hiểu, cùng lên đường <Icon name="arrow" /></button></>}
      {modal==='journeys' && <><p>Ba nhiệm vụ, cùng một khung lịch sử. Hoàn thành một tuyến với bất kỳ kết quả nào để mở góc nhìn tiếp theo.</p><div className="journey-list">{story.campaigns.map(c=>{const unlocked=save.unlocked.includes(c.id); const active=run?.campaignId===c.id && run.phase!=='complete'; const done=save.runs.some(r=>r.campaignId===c.id); return <button key={c.id} className={`journey-card ${unlocked ? 'available' : 'locked'}`} disabled={!unlocked} onClick={()=>begin(c.id)}><span>{c.id}</span><div><small>{active ? `ĐANG ĐI · MÀN ${scene.order}/12` : done ? 'ĐÃ HOÀN THÀNH · CÓ THỂ CHƠI LẠI' : unlocked ? 'SẴN SÀNG LÊN ĐƯỜNG' : `MỞ SAU HÀNH TRÌNH ${c.unlockAfter}`}</small><b>{c.name}</b><p>{c.description}</p></div><Icon name={unlocked ? 'arrow' : 'lock'} /></button>;})}</div><p className="unlock-note"><Icon name="info" />Lượt mới đặt lại nhiệm vụ và giữ bộ sưu tập của bạn.</p></>}
      {modal==='history' && <History index={historyIndex} onIndex={setHistoryIndex} />}
      {modal==='object' && <><div className="history-visual"><SceneArt scene={scene} illustrated /></div><div className="history-meta"><span>{scene.time}</span><span>{scene.hotspots[objectIndex].isHistorical ? 'Dữ kiện lịch sử' : 'Đạo cụ hư cấu'}</span></div><p>{scene.hotspots[objectIndex].text}</p>{run?.items[scene.id] && <div className="notice"><Icon name="book" /><div><b>{run.items[scene.id].state}</b>{run.items[scene.id].description}</div></div>}<button className="text-button" onClick={()=>openHistory()}>Mở thẻ lịch sử của chặng này <Icon name="arrow" /></button></>}
      {modal==='map' && <><p className="local-note">Sơ đồ các chặng và mốc học tập; không mô tả một lộ trình chính xác qua từng cảng. Chuyến đi của An là hư cấu.</p><div className="journey-map" aria-hidden="true"><svg viewBox="0 0 700 235"><path d="m70 160 52-87 51 10 37-30 83 8 32 43 55-43 105 25 40 51 89 27-42 53-152-9-91-41-94 38-74-4z" fill="#bdbea2" stroke="#8e947b" strokeWidth="2" /><path d="M544 158Q350 260 260 80T360 63Q430 68 494 144l50 14" fill="none" stroke="#8d322a" strokeWidth="2" strokeDasharray="6 6" />{[[544,158,'Sài Gòn'],[260,80,'Pháp'],[360,63,'Nga Xô viết'],[494,144,'Quảng Châu']].map(([x,y,label])=><g key={label}><circle cx={x} cy={y} r="5" fill="#8d322a" /><text x={Number(x)+8} y={Number(y)-9} fontSize="13" fill="#172d38">{label}</text></g>)}</svg><span>1911 — 1930</span></div><div className="timeline-list">{campaign.sceneIds.map(id=>{const s=sceneById[id]; return <button key={id} className={id===run?.sceneId ? 'current' : ''} onClick={()=>openHistory(s.order-1)}><span>{run?.choices[id] ? <Icon name="check" size={16} /> : String(s.order).padStart(2,'0')}</span><div><b>{s.title}</b><small>{s.time} · {s.place}</small></div><Icon name="book" size={17} /></button>;})}</div></>}
      {modal==='journal' && <><div className="journal-tabs" role="tablist" aria-label="Các phần nhật ký">{([['choices','Lựa chọn'],['items','Hành trang'],['runs','Các lượt'],['practice','Ôn tập']] as const).map(([id,label])=><button key={id} role="tab" id={`tab-${id}`} aria-selected={journalTab===id} aria-controls="journal-panel" className={journalTab===id ? 'active' : ''} onClick={()=>setJournalTab(id)}>{label}</button>)}</div><div id="journal-panel" role="tabpanel" aria-labelledby={`tab-${journalTab}`}>
        {journalTab==='choices' && (run?.journal.length ? <div className="journal-entries">{run.journal.map(id=>{const s=sceneById[id];const c=s.choices.find(c=>c.id===run.choices[id])!;return <article key={id}><small>{id} · {s.time}</small><h3>{s.title}</h3><p><b>Bạn đã chọn:</b> {c.text}</p><p>{c.feedback}</p><button className="text-button" onClick={()=>openHistory(s.order-1)}>Đọc thẻ lịch sử <Icon name="arrow" size={14} /></button></article>;})}</div> : <Empty title="Trang đầu còn đang mở" text="Lựa chọn đầu tiên của bạn sẽ được giữ lại ở đây." />)}
        {journalTab==='items' && (run?.journal.length ? <div className="inventory-grid">{Object.values(run.items).map(item=><article key={item.id}><Icon name="book" size={28} /><small>{item.id}</small><h3>{item.title}</h3><b>{item.state}</b><p>{item.description}</p></article>)}</div> : <Empty title="Chiếc túi vẫn còn nhẹ" text="Những trang sổ, bản nháp và bảng phân công sẽ xuất hiện theo hành trình." />)}
        {journalTab==='runs' && (save.runs.length ? <div className="run-history">{[...save.runs].reverse().map(r=><details key={r.id}><summary>{campaignById[r.campaignId].name} · {story.endings.find(e=>e.id===r.endingId)!.title}<small>{new Date(r.completedAt).toLocaleDateString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'})}</small></summary>{r.journal.map(id=><p key={id}><b>{id}</b> · {sceneById[id].choices.find(c=>c.id===r.choices[id])!.feedback}</p>)}</details>)}</div> : <Empty title="Hành trình chưa khép lại" text="Lịch sử các lượt đã hoàn thành sẽ được giữ khi bạn bắt đầu góc nhìn mới." />)}
        {journalTab==='practice' && <><p className="local-note">Ôn tập độc lập. Câu trả lời ở đây không đổi lựa chọn hay ending của bất kỳ lượt nào.</p>{allRuns.flatMap(r=>reviewScenes(r).map(s=><Practice key={`${r.id}-${s.id}`} scene={s} selected={practiceChoice[`${r.id}-${s.id}`]} choose={id=>setPracticeChoice(p=>({...p,[`${r.id}-${s.id}`]:id}))} history={()=>openHistory(s.order-1)} />))}{!allRuns.some(r=>reviewScenes(r).length) && <Empty title="Chưa có câu cần ôn lại" text="Bạn có thể đọc toàn bộ thẻ lịch sử trong Nguồn tư liệu." />}</>}
      </div></>}
      {modal==='collection' && <><p>{save.collection.length}/9 kết thúc đã mở. Mỗi kết thúc là một khả năng của nhiệm vụ hư cấu; không cần đạt mọi Bad ending để hoàn thành học tập.</p><div className="ending-grid">{story.endings.map(e=>{const unlocked=save.collection.includes(e.id);return <button key={e.id} className={unlocked ? 'unlocked' : ''} onClick={()=>{if(unlocked){setDetailEnding(e);setModal('endingDetail');}}} disabled={!unlocked}><span><Icon name={unlocked ? 'spark' : 'lock'} /></span><small>HÀNH TRÌNH {e.campaignId} · {e.type==='neutral' ? 'Neutral' : e.type==='good' ? 'Good' : 'Bad'} ending</small><b>{unlocked ? e.title : 'Một trang chưa mở'}</b></button>;})}</div><button className="text-button" onClick={()=>setModal('journeys')}>Chọn góc nhìn tiếp theo <Icon name="arrow" /></button></>}
      {modal==='endingDetail' && detailEnding && <><div className="history-visual"><SceneArt scene={sceneById[`${detailEnding.campaignId}-12`]} ending variant={detailEnding.type} /></div><p>{detailEnding.text}</p><p className="local-note">Kết thúc hư cấu của An · năm 1930. Dòng lịch sử vẫn tiếp tục.</p><button className="text-button" onClick={()=>setModal('collection')}>← Trở lại bộ sưu tập</button></>}
      {modal==='settings' && <><div className="settings-list">{([['sound','Âm thanh môi trường','Gió và phản hồi nhẹ; có thể chơi đủ khi tắt.'],['largeText','Chữ lớn hơn','Tăng cỡ chữ nội dung để đọc thoải mái.'],['reducedMotion','Giảm chuyển động','Dừng chuyển cảnh và hiệu ứng trang trí.'],['shuffle','Đổi vị trí phương án','Áp dụng từ lượt mới; lưu cố định suốt lượt.']] as const).map(([key,title,text])=><label key={key}><span><b>{title}</b><small>{text}</small></span><input type="checkbox" checked={save.settings[key]} onChange={()=>setting(key)} /><i aria-hidden="true" /></label>)}</div><div className="notice"><Icon name="info" /><div><b>{saved ? 'Đã lưu trên trình duyệt này' : 'Đang giữ hành trình trong phiên'}</b>Tiến trình không tự đồng bộ giữa thiết bị. Chế độ riêng tư hoặc xóa dữ liệu trình duyệt có thể làm mất bản lưu.</div></div><div className="modal-actions"><button className="secondary-button" onClick={exportSave}>Xuất bản lưu</button><button className="secondary-button" onClick={()=>fileInput.current?.click()}>Nhập bản lưu</button></div><button className="text-button danger" onClick={()=>setConfirmation({title:'Xóa toàn bộ tiến trình?',text:'Sẽ xóa lượt hiện tại, lịch sử các lượt, bộ sưu tập ending, tuyến đã mở và cài đặt trên trình duyệt này. Ứng dụng sẽ trở về lần mở đầu tiên. Bạn có thể hủy để xuất bản lưu trước.',action:()=>{setSave(freshSave());setWritable(true);setNotice('Đã tạo hành trình mới.');setConfirmation(null);setModal(null);}})}>Xóa toàn bộ tiến trình</button></>}
      {modal==='pause' && <div className="pause-actions"><div className="pause-mark"><Icon name="pause" size={32} /></div><p>Câu chuyện đang đợi bạn ở màn {scene.order}/12.<br />{saved ? 'Lựa chọn và hành trang đã được lưu.' : 'Hành trình đang được giữ trong phiên này.'}</p><button className="primary-button" onClick={()=>setModal(null)}>Tiếp tục câu chuyện <Icon name="play" /></button><button className="secondary-button" onClick={()=>setModal('journal')}>Mở nhật ký</button><button className="secondary-button" onClick={()=>setModal('map')}>Xem bản đồ</button><button className="secondary-button" onClick={()=>setModal('settings')}>Cài đặt & bản lưu</button><button className="text-button" onClick={()=>begin(run!.campaignId,true)}>Bắt đầu lại lượt hiện tại</button><button className="text-button" onClick={home}>Về trang chủ</button></div>}
    </Dialog>}
    {confirmation && <Dialog title={confirmation.title} close={()=>setConfirmation(null)}><p>{confirmation.text}</p><div className="modal-actions"><button className="secondary-button" onClick={()=>setConfirmation(null)}>Hủy, giữ nguyên</button><button className="primary-button" onClick={confirmation.action}>Xác nhận</button></div></Dialog>}
    <input ref={fileInput} type="file" accept="application/json,.json" hidden aria-label="Chọn tệp bản lưu" onChange={e=>void importSave(e.target.files?.[0])} />
  </>;
}

function HowTo() { return <div className="how-to"><div><span>01</span><Icon name="compass" /><b>Quan sát bối cảnh</b><small>Dùng nút + dưới ảnh để khám phá đạo cụ của An.</small></div><div><span>02</span><Icon name="book" /><b>Đọc và lắng nghe</b><small>Theo dõi hội thoại, mở thẻ lịch sử có nguồn.</small></div><div><span>03</span><Icon name="arrow" /><b>Đưa ra lựa chọn</b><small>Đọc hệ quả rồi tiếp tục chặng tiếp theo.</small></div></div>; }
function History({index,onIndex}:{index:number;onIndex:(index:number)=>void}) {
  const card=story.historyCards[index];
  return <><label className="select-label" htmlFor="history-select">Chọn mốc lịch sử</label><select id="history-select" value={index} onChange={e=>onIndex(Number(e.target.value))}>{story.historyCards.map((c,i)=><option key={c.id} value={i}>{String(c.order).padStart(2,'0')} · {c.time}</option>)}</select>
    <div className="history-meta"><span>{card.time}</span><span>SỰ KIỆN CÓ THẬT</span></div><p className="history-fact">{card.fact}</p>
    <HistoricalGallery key={card.id} order={card.order} />
    <h3 className="history-sources-title">Nguồn đối chiếu sự kiện</h3><div className="source-links">{card.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title}{source.status==='unavailable' ? ' (chưa truy cập được)' : ''}<Icon name="arrow" size={15} /></a>)}</div><div className="notice"><Icon name="info" /><div><b>Phân biệt với truyện của An</b>{card.distinction}</div></div><p className="local-note">Nguồn sự kiện đối chiếu ngày 04/11/2026. Danh mục ảnh đối chiếu ngày 12/11/2026.{index===6 ? ' Liên kết gốc về Tours tại mpi.gov.vn không truy cập được; đã bổ sung biên niên chính thức để đối chiếu.' : ''}</p></>;
}
function Practice({scene,selected,choose,history}:{scene:Scene;selected?:string;choose:(id:string)=>void;history:()=>void}) {
  const chosen=scene.choices.find(c=>c.id===selected);
  return <article className="practice-card"><small>{scene.id} · {scene.time}</small><h3>{scene.question}</h3><div className="options">{scene.choices.map(c=><button key={c.id} onClick={()=>choose(c.id)} className={selected===c.id ? 'selected' : ''}>{c.text}</button>)}</div>{chosen && <div className="result-box" role="status"><p>{chosen.feedback}</p><p><b>Đáp án đúng:</b> {scene.choices.find(c=>c.correct)!.text}</p><p>{scene.explanation}</p></div>}<button className="text-button" onClick={history}>Mở nguồn tư liệu <Icon name="arrow" size={14} /></button></article>;
}
