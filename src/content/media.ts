import data from './history-media.json' with { type: 'json' };

export interface HistoricalImage {
  id: string; title: string; src: string; largeSrc: string; width: number; height: number;
  type: string; period: string; photoDate: string; caption: string; description: string; caution: string;
  source: { name: string; title: string; url: string; imageUrl: string; credit: string | null; rights: string };
  original: { file: string; width: number; height: number; sha256: string };
}
export interface StageMedia {
  order: number; theme: string; assetIds: string[]; backgroundId: string; layout: 'landscape' | 'document'; backgroundNote: string;
}
export const historyMedia = data as { version: number; catalogDate: string; assets: HistoricalImage[]; stages: StageMedia[] };
export const imageById = Object.fromEntries(historyMedia.assets.map(asset => [asset.id, asset]));
export function mediaForStage(order: number): StageMedia {
  const stage = historyMedia.stages.find(stage => stage.order === order);
  if (!stage) throw new Error(`Missing historical media for stage ${order}`);
  return stage;
}

// Relative URLs keep the bundled images working when deployed below a subpath.
export function mediaUrl(path: string) { return `${import.meta.env.BASE_URL}${path}`; }
