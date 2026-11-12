import { useId, useState } from 'react';
import { imageById, mediaForStage, mediaUrl } from '../content/media';
import type { HistoricalImage } from '../content/media';
import { Icon } from './Icon';
import { Dialog } from './Dialog';

export function ArchiveScene({ order }: { order: number }) {
  const stage = mediaForStage(order);
  const asset = imageById[stage.backgroundId];
  const [failed, setFailed] = useState(false);
  return <div className={`archive-scene archive-${stage.layout}`}>
    <div className="archive-mount">
      {failed ? <div className="image-unavailable" role="status"><Icon name="book" size={32} /><span>Chưa tải được ảnh tư liệu</span><small>{asset.title}</small></div> :
        <img src={mediaUrl(asset.src)} width={asset.width} height={asset.height} alt={asset.caption} onError={()=>setFailed(true)} decoding="async" />}
    </div>
    <span className="archive-badge">TƯ LIỆU BỐI CẢNH · {asset.id}</span>
  </div>;
}

export function SceneImageCredit({ order, onExplore }: { order: number; onExplore: () => void }) {
  const stage = mediaForStage(order);
  const asset = imageById[stage.backgroundId];
  return <div className="scene-image-credit">
    <div><b>{asset.title}</b><p>{stage.backgroundNote}</p>
      <a href={asset.source.url} target="_blank" rel="noreferrer">Nguồn ảnh: {asset.source.name}<Icon name="arrow" size={12} /></a>
    </div>
    <button className="text-button" onClick={onExplore}>Xem ảnh & chú thích <Icon name="arrow" size={14} /></button>
  </div>;
}

function Provenance({ asset }: { asset: HistoricalImage }) {
  return <>
    <a className="image-source" href={asset.source.url} target="_blank" rel="noreferrer"><span><small>NGUỒN ẢNH</small>{asset.source.name}</span><Icon name="arrow" size={16} /></a>
    <details className="image-provenance"><summary>Niên đại, xuất xứ & lưu ý đọc ảnh</summary>
      <dl><dt>Niên đại nội dung</dt><dd>{asset.period}</dd><dt>Ngày chụp / bản ảnh</dt><dd>{asset.photoDate}</dd><dt>Lưu ý</dt><dd>{asset.caution}</dd><dt>Hồ sơ nguồn</dt><dd>{asset.source.title}{asset.source.credit && ` · ${asset.source.credit}`}</dd><dt>Quyền sử dụng theo danh mục</dt><dd>{asset.source.rights}</dd></dl>
      <a href={asset.source.imageUrl} target="_blank" rel="noreferrer">Xem tệp ảnh tại nguồn <Icon name="arrow" size={12} /></a>
    </details>
  </>;
}

export function HistoricalGallery({ order }: { order: number }) {
  const stage = mediaForStage(order);
  const [activeId, setActiveId] = useState(stage.backgroundId);
  const [zoom, setZoom] = useState(false);
  const [failed, setFailed] = useState(false);
  const captionId = useId();
  const asset = imageById[activeId];
  const index = stage.assetIds.indexOf(activeId);
  function select(id: string) { setActiveId(id); setFailed(false); }
  return <section className="historical-gallery" aria-label={`Ảnh tư liệu: ${stage.theme}`}>
    <div className="gallery-heading"><span>HỒ SƠ HÌNH ẢNH</span><span aria-live="polite">{index + 1} / {stage.assetIds.length}</span></div>
    <figure className="historical-figure">
      <button className="archive-photo-button" onClick={()=>setZoom(true)} aria-label={`Phóng lớn ảnh: ${asset.title}`} aria-describedby={captionId}>
        {failed ? <span className="image-unavailable"><Icon name="book" /><span>Chưa tải được ảnh · Xem liên kết nguồn bên dưới</span></span> :
          <img key={asset.id} src={mediaUrl(asset.src)} width={asset.width} height={asset.height} alt={asset.description} decoding="async" onError={()=>setFailed(true)} />}
        <span className="photo-zoom"><span aria-hidden="true">+</span>Phóng lớn</span>
      </button>
      <figcaption id={captionId}><span className="image-kind">{asset.id} · {asset.type}</span><h3>{asset.title}</h3><p className="image-caption">{asset.caption}</p><p className="image-description">{asset.description}</p></figcaption>
    </figure>
    {stage.assetIds.length > 1 && <div className="archive-filmstrip" role="group" aria-label="Chọn ảnh trong mốc này">{stage.assetIds.map(id=>{
      const thumbnail = imageById[id];
      return <button key={id} aria-pressed={id===activeId} aria-label={`Xem ảnh ${thumbnail.title}`} onClick={()=>select(id)}><img src={mediaUrl(thumbnail.src)} alt="" width={thumbnail.width} height={thumbnail.height} loading="lazy" /><span>{thumbnail.title}</span></button>;
    })}</div>}
    <Provenance asset={asset} />
    {zoom && <Dialog title={asset.title} close={()=>setZoom(false)} wide>
      <div className="archive-zoom-image"><img src={mediaUrl(asset.largeSrc)} width={asset.original.width} height={asset.original.height} alt={asset.description} onError={e=>{if(e.currentTarget.getAttribute('src')!==mediaUrl(asset.src))e.currentTarget.src=mediaUrl(asset.src);}} /></div>
      <p>{asset.caption}</p><Provenance asset={asset} />
    </Dialog>}
  </section>;
}
