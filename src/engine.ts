import { campaignById, sceneById, story } from './content/index.ts';
import type { CampaignId, EndingType, Item } from './content/index.ts';

export const SAVE_KEY = 'footsteps-to-dawn.v1';
export const SAVE_VERSION = 1;
export type View = 'home' | 'intro' | 'game' | 'ending';
export interface Settings { sound: boolean; largeText: boolean; reducedMotion: boolean; shuffle: boolean }
export interface Run {
  id: string; campaignId: CampaignId; sceneId: string; phase: 'opening' | 'choice' | 'consequence' | 'complete';
  choices: Record<string, string>; optionOrders: Record<string, string[]>; score: number;
  k6: boolean | null; k12: boolean | null; items: Record<string, Item>; flags: Record<string, string>;
  journal: string[]; createdAt: string; completedAt?: string; inheritedEnding?: string;
}
export interface CompletedRun extends Run { phase: 'complete'; endingId: string; completedAt: string }
export interface Save {
  version: number; dataVersion: number; view: View; current: Run | null; runs: CompletedRun[];
  unlocked: CampaignId[]; collection: string[]; settings: Settings; updatedAt: string;
}
export function freshSave(): Save {
  return { version: SAVE_VERSION, dataVersion: story.version, view: 'home', current: null, runs: [], unlocked: ['I'], collection: [], settings: { sound: false, largeText: false, reducedMotion: false, shuffle: false }, updatedAt: new Date().toISOString() };
}
export function endingType(score: number, k6: boolean | null, k12: boolean | null): EndingType {
  return score >= 18 && k6 && k12 ? 'good' : score >= 8 ? 'neutral' : 'bad';
}
function shuffled<T>(array: T[], random: () => number) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
}
export function startCampaign(save: Save, campaignId: CampaignId, id: string = crypto.randomUUID(), random = Math.random): Save {
  if (!save.unlocked.includes(campaignId)) return save;
  const previous = save.runs.at(-1);
  const run: Run = {
    id, campaignId, sceneId: `${campaignId}-01`, phase: 'opening', choices: {}, score: 0, k6: null, k12: null,
    items: {}, flags: {}, journal: [], createdAt: new Date().toISOString(),
    optionOrders: Object.fromEntries(campaignById[campaignId].sceneIds.map(sid => [sid, save.settings.shuffle ? shuffled(sceneById[sid].choices.map(c => c.id), random) : sceneById[sid].choices.map(c => c.id)])),
    ...(previous && previous.campaignId !== campaignId ? { inheritedEnding: previous.endingId } : {})
  };
  return touch({ ...save, current: run, view: 'intro' });
}
export function touch(save: Save): Save { return { ...save, updatedAt: new Date().toISOString() }; }
export function enterRun(save: Save): Save {
  if (!save.current) return save;
  return touch({ ...save, view: save.current.phase === 'complete' ? 'ending' : 'game', current: { ...save.current, phase: save.current.phase === 'opening' ? 'choice' : save.current.phase } });
}
export function choose(save: Save, sceneId: string, choiceId: string): Save {
  const run = save.current;
  if (!run || run.phase !== 'choice' || run.sceneId !== sceneId || run.choices[sceneId]) return save;
  const scene = sceneById[sceneId]; const choice = scene?.choices.find(c => c.id === choiceId);
  if (!choice || scene.campaignId !== run.campaignId) return save;
  return touch({ ...save, current: { ...run, phase: 'consequence', choices: { ...run.choices, [sceneId]: choiceId },
    score: run.score + choice.points, k6: scene.order === 6 ? !!choice.correct : run.k6, k12: scene.order === 12 ? !!choice.correct : run.k12,
    items: { ...run.items, [sceneId]: choice.itemChange }, flags: { ...run.flags, [sceneId]: choiceId }, journal: [...run.journal, sceneId] } });
}
export function advance(save: Save, expectedSceneId: string): Save {
  const run = save.current;
  if (!run || run.phase !== 'consequence' || run.sceneId !== expectedSceneId || !run.choices[expectedSceneId]) return save;
  const scene = sceneById[run.sceneId];
  if (scene.nextSceneId) return touch({ ...save, current: { ...run, sceneId: scene.nextSceneId, phase: 'choice' } });
  if (!campaignById[run.campaignId].sceneIds.every(sid => sceneById[sid].choices.some(c => c.id === run.choices[sid]))) return save;
  const type = endingType(run.score, run.k6, run.k12);
  const endingId = `${run.campaignId}-${type}`;
  const complete: CompletedRun = { ...run, phase: 'complete', endingId, completedAt: new Date().toISOString() };
  const next = story.endings.find(e => e.id === endingId)!.nextCampaignId;
  return touch({ ...save, current: complete, view: 'ending', runs: [...save.runs.filter(r => r.id !== run.id), complete],
    collection: [...new Set([...save.collection, endingId])], unlocked: [...new Set([...save.unlocked, ...(next ? [next] : [])])] });
}
export function conditionalDialogue(run: Run) {
  return sceneById[run.sceneId].conditions.map(c => run.choices[c.sceneId] === c.choiceId ? c.matched : c.otherwise);
}
export function keyMoments(run: Run) {
  const all = run.journal.map(sid => ({ scene: sceneById[sid], choice: sceneById[sid].choices.find(c => c.id === run.choices[sid])! }));
  return all.sort((a,b) => a.choice.points - b.choice.points || Number(b.scene.conditions.length > 0) - Number(a.scene.conditions.length > 0) || a.scene.order - b.scene.order).slice(0,3).sort((a,b) => a.scene.order - b.scene.order);
}
export function reviewScenes(run: Run) { return run.journal.map(sid => sceneById[sid]).filter(s => s.type === 'KT' && !s.choices.find(c => c.id === run.choices[s.id])?.correct); }

const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
function validRun(value: unknown): value is Run {
  if (!object(value)) return false;
  const r = value as unknown as Run;
  if (typeof r.id !== 'string' || !r.id || typeof r.createdAt !== 'string' || !Object.hasOwn(campaignById,r.campaignId) || !['opening','choice','consequence','complete'].includes(r.phase) || !object(r.choices) || !object(r.optionOrders) || !object(r.items) || !object(r.flags) || !Array.isArray(r.journal)) return false;
  const ids = campaignById[r.campaignId].sceneIds; const index = ids.indexOf(r.sceneId);
  if (index < 0) return false;
  const count = index + Number(r.phase === 'consequence' || r.phase === 'complete');
  if (r.phase === 'opening' && index !== 0 || r.phase === 'complete' && index !== 11 || Object.keys(r.choices).length !== count || r.journal.length !== count) return false;
  let score = 0; let k6: boolean | null = null; let k12: boolean | null = null;
  for (let i=0;i<ids.length;i++) {
    const sid = ids[i]; const scene = sceneById[sid]; const order = r.optionOrders[sid];
    if (!Array.isArray(order) || order.length !== 4 || new Set(order).size !== 4 || !order.every(id => scene.choices.some(c => c.id === id))) return false;
    if (i >= count) continue;
    const c = scene.choices.find(c => c.id === r.choices[sid]);
    if (!c || r.journal[i] !== sid || r.flags[sid] !== c.id || JSON.stringify(r.items[sid]) !== JSON.stringify(c.itemChange)) return false;
    score += c.points; if (i === 5) k6 = !!c.correct; if (i === 11) k12 = !!c.correct;
  }
  return Number.isFinite(r.score) && r.score === score && r.k6 === k6 && r.k12 === k12;
}
export function parseSave(raw: string): Save {
  if (raw.length > 5_000_000) throw new Error('Bản lưu quá lớn. Hãy chọn tệp xuất từ ứng dụng.');
  let value: unknown; try { value = JSON.parse(raw); } catch { throw new Error('Bản lưu không đọc được. Bạn có thể tải bản gốc trước khi tạo bản lưu mới.'); }
  if (!object(value) || value.version !== SAVE_VERSION || value.dataVersion !== story.version) throw new Error('Phiên bản bản lưu không tương thích. Hãy giữ bản gốc để khôi phục sau.');
  const s = value as unknown as Save;
  if (!['home','intro','game','ending'].includes(s.view) || !Array.isArray(s.runs) || !Array.isArray(s.unlocked) || !Array.isArray(s.collection) || !object(s.settings) || typeof s.updatedAt !== 'string' || !Object.values(s.settings).every(v => typeof v === 'boolean') || !['sound','largeText','reducedMotion','shuffle'].every(k => typeof s.settings[k as keyof Settings] === 'boolean')) throw new Error('Cấu trúc bản lưu chưa hợp lệ.');
  if (s.current !== null && !validRun(s.current)) throw new Error('Tiến trình chưa nhất quán. Bản gốc được giữ lại để bạn khôi phục.');
  if (s.view !== 'home' && !s.current || s.view === 'ending' && s.current?.phase !== 'complete' || s.view === 'intro' && s.current?.phase !== 'opening' || s.view === 'game' && !['choice','consequence'].includes(s.current?.phase || '')) throw new Error('Trạng thái màn chơi không hợp lệ.');
  if (!s.runs.every(r => validRun(r) && r.phase === 'complete' && typeof r.completedAt === 'string' && r.endingId === `${r.campaignId}-${endingType(r.score,r.k6,r.k12)}`) || new Set(s.runs.map(r => r.id)).size !== s.runs.length) throw new Error('Lịch sử lượt chơi không hợp lệ.');
  const collection = [...new Set(s.runs.map(r => r.endingId))];
  const unlocked = [...new Set<CampaignId>(['I', ...s.runs.flatMap(r => r.campaignId === 'I' ? ['II' as const] : r.campaignId === 'II' ? ['III' as const] : [])])];
  if (s.collection.length !== collection.length || !s.collection.every(id => collection.includes(id)) || s.unlocked.length !== unlocked.length || !s.unlocked.every(id => unlocked.includes(id)) || s.current && !unlocked.includes(s.current.campaignId)) throw new Error('Bộ sưu tập và điều kiện mở tuyến chưa nhất quán.');
  if (s.current?.phase === 'complete' && !s.runs.some(r => r.id === s.current!.id && JSON.stringify(r) === JSON.stringify(s.current))) throw new Error('Lượt hoàn thành chưa có trong lịch sử.');
  return s;
}
export interface StorageLike { getItem(key: string): string | null; setItem(key: string, value: string): void }
export function loadSave(storage: Pick<StorageLike,'getItem'>): { save: Save; notice: string; raw: string | null; writable: boolean } {
  let raw: string | null = null;
  try { raw = storage.getItem(SAVE_KEY); return { save: raw ? parseSave(raw) : freshSave(), notice: '', raw, writable: true }; }
  catch (error) { return { save: freshSave(), notice: raw !== null && error instanceof Error ? error.message : 'Trình duyệt chặn lưu dữ liệu. Bạn vẫn có thể chơi trong phiên này; hãy xuất bản lưu để giữ hành trình.', raw, writable: raw === null }; }
}
export function persistSave(storage: Pick<StorageLike,'setItem'>, save: Save): string | null {
  try { storage.setItem(SAVE_KEY, JSON.stringify(save)); return null; }
  catch { return 'Không thể lưu trên trình duyệt. Bạn vẫn chơi được trong phiên này; hãy xuất bản lưu để giữ hành trình.'; }
}
