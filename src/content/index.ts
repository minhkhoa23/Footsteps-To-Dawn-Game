import data from './story.json' with { type: 'json' };
export type CampaignId = 'I' | 'II' | 'III';
export type EndingType = 'good' | 'neutral' | 'bad';
export interface Item { id: string; title: string; state: string; description: string }
export interface Choice {
  id: string; originalLabel: string; text: string; points: number; correct: boolean | null;
  feedback: string; itemChange: Item; milestone: string | null;
}
export interface Scene {
  id: string; campaignId: CampaignId; order: number; type: 'KT' | 'TH'; title: string;
  time: string; place: string; background: string; characters: string[]; context: string; lead: string;
  dialogue: { speaker: string; text: string }; question: string; choices: Choice[];
  nextSceneId: string | null; historyId: string; explanation: string;
  hotspots: { id: string; name: string; text: string; isHistorical: boolean }[];
  conditions: { sceneId: string; choiceId: string; matched: string; otherwise: string }[];
}
export interface Campaign { id: CampaignId; name: string; description: string; objective: string; opening: string; sceneIds: string[]; unlockAfter: CampaignId | null }
export interface HistoryCard { id: string; order: number; time: string; fact: string; distinction: string; sources: { title: string; url: string; status: string }[] }
export interface Ending { id: string; campaignId: CampaignId; type: EndingType; title: string; text: string; illustration: string; momentsRule: string; nextCampaignId: CampaignId | null }
export const story = data as { version: number; campaigns: Campaign[]; scenes: Scene[]; historyCards: HistoryCard[]; endings: Ending[] };
export const sceneById = Object.fromEntries(story.scenes.map(s => [s.id, s]));
export const campaignById = Object.fromEntries(story.campaigns.map(c => [c.id, c])) as Record<CampaignId, Campaign>;

export function inheritedText(id: string | undefined) {
  if (!id) return '';
  const props: Record<string, string> = {
    'I-good': 'Cuốn sổ có mục lục tham khảo từ một góc nhìn trước.',
    'I-neutral': 'Một dấu trang cũ nhắc An về những câu hỏi còn mở.',
    'I-bad': 'Một trang sổ mới đang chờ An bắt đầu lại.',
    'II-good': 'Một thư mời chia sẻ bản đọc nằm trong túi của An.',
    'II-neutral': 'An mang theo danh sách câu hỏi cần tiếp tục trao đổi.',
    'II-bad': 'Một tờ hướng dẫn kiểm chứng trở thành hành trang mới.'
  };
  return props[id] || '';
}
