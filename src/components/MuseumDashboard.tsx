import { useState } from 'react';
import {
  DASHBOARD_PHOTOS,
  MUSEUM_EXHIBITIONS,
  MUSEUM_HERO_SLIDES,
  mediaUrl,
} from '../content/media';
import type { DashboardPhoto, MuseumExhibitPhoto } from '../content/media';
import { story, campaignById, sceneById } from '../content';
import type { CampaignId } from '../content';
import type { Save } from '../engine';
import { Icon } from './Icon';
import { Dialog } from './Dialog';

const MUSEUM_PILLARS = [
  {
    step: '01',
    period: '1911 — 1930 · TRONG TRÒ CHƠI',
    title: 'Khởi nguồn con đường cứu nước',
    text: 'Qua 3 hành trình của nhân vật An (36 màn chơi), người học theo dõi bối cảnh thuộc địa và quá trình Nguyễn Ái Quốc bôn ba tìm đường cứu nước, chuẩn bị về chính trị, tư tưởng và tổ chức cho sự ra đời của Đảng Cộng sản Việt Nam.',
  },
  {
    step: '02',
    period: '1945 — 1975 · TẠI BẢO TÀNG',
    title: 'Chứng tích đấu tranh bảo vệ độc lập',
    text: 'Từ ngọn đuốc dẫn đường năm 1930 và bản Tuyên ngôn Độc lập năm 1945, dân tộc Việt Nam đã vượt qua cuộc kháng chiến trường kỳ để bảo vệ nền độc lập. Bảo tàng Chứng tích Chiến tranh lưu giữ hơn 20.000 tài liệu, hiện vật về giai đoạn lịch sử bi tráng ấy.',
  },
  {
    step: '03',
    period: 'HÔM NAY · HÀNH TRÌNH CỦA NHÓM',
    title: 'Ký ức lịch sử & khát vọng hòa bình',
    text: 'Chuyến khảo sát thực tế của nhóm tại Bảo tàng Chứng tích Chiến tranh kết nối bài học lịch sử trên giảng đường với không gian di sản thực tế, lan tỏa thông điệp trân trọng hòa bình và hữu nghị quốc tế.',
  },
];

interface ZoomItem {
  code: string;
  title: string;
  zone: string;
  badge: string;
  src: string;
  largeSrc?: string;
  width: number;
  height: number;
  caption: string;
  story: string;
  historicalNote: string;
}

interface MuseumDashboardProps {
  save: Save;
  onStartCampaign: (id: CampaignId) => void;
  onResumeGame: () => void;
  onOpenHistory: (index?: number) => void;
  onOpenJournal: () => void;
  onOpenCollection: () => void;
  onOpenJourneys: () => void;
  onScrollToGame: () => void;
}

export function MuseumDashboard({
  save,
  onStartCampaign,
  onResumeGame,
  onOpenHistory,
  onOpenJournal,
  onOpenCollection,
  onOpenJourneys,
  onScrollToGame,
}: MuseumDashboardProps) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [exhibitIndex, setExhibitIndex] = useState(0);
  const [exhibitPhotoIndex, setExhibitPhotoIndex] = useState(0);
  const [zoomItem, setZoomItem] = useState<ZoomItem | null>(null);

  const heroSlide = MUSEUM_HERO_SLIDES[heroIndex];
  const activePhoto = DASHBOARD_PHOTOS[activeIndex];
  const activeExhibit = MUSEUM_EXHIBITIONS[exhibitIndex];
  const activeExhibitPhoto = activeExhibit.photos[exhibitPhotoIndex] || activeExhibit.photos[0];

  const run = save.current;
  const currentScene = run ? sceneById[run.sceneId] : story.scenes[0];

  function openDashboardPhotoZoom(photo: DashboardPhoto) {
    setZoomItem({
      code: photo.code,
      title: photo.title,
      zone: photo.zone,
      badge: photo.badge,
      src: photo.src,
      largeSrc: photo.largeSrc,
      width: photo.width,
      height: photo.height,
      caption: photo.caption,
      story: photo.story,
      historicalNote: photo.historicalNote,
    });
  }

  function openExhibitPhotoZoom(photo: MuseumExhibitPhoto, sectionTitle: string, location: string) {
    setZoomItem({
      code: photo.code,
      title: photo.title,
      zone: location,
      badge: sectionTitle,
      src: photo.src,
      width: photo.width,
      height: photo.height,
      caption: photo.caption,
      story: photo.detail,
      historicalNote: `Ảnh tư liệu thực tế do nhóm ghi nhận tại Bảo tàng Chứng tích Chiến tranh (${photo.fileOrigin}).`,
    });
  }

  function selectExhibition(idx: number) {
    setExhibitIndex(idx);
    setExhibitPhotoIndex(0);
  }

  return (
    <section
      id="museum-dashboard"
      className="dashboard-section"
      aria-label="Giới thiệu Bảo tàng Chứng tích Chiến tranh và tổng quan dự án của nhóm"
    >
      <div className="dashboard-container">
        {/* 1. HERO LỚN MỞ ĐẦU DASHBOARD: GIỚI THIỆU BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH */}
        <div className="museum-grand-hero paper-card">
          <div className="museum-grand-media">
            <div className="museum-grand-photo-wrap">
              <img
                key={heroSlide.id}
                src={mediaUrl(heroSlide.src)}
                width={heroSlide.width}
                height={heroSlide.height}
                alt={heroSlide.caption}
                decoding="async"
              />
              <div className="museum-grand-gradient" />
              <div className="museum-grand-badges">
                <span className="spotlight-badge">
                  <Icon name="compass" size={14} /> BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH · TP.HCM
                </span>
                <span className="spotlight-counter">
                  GÓC NHÌN {heroIndex + 1} / {MUSEUM_HERO_SLIDES.length}
                </span>
              </div>
              <button
                type="button"
                className="spotlight-zoom-btn"
                onClick={() =>
                  openExhibitPhotoZoom(
                    heroSlide,
                    'Không gian tiêu biểu Bảo tàng Chứng tích Chiến tranh',
                    'Số 28 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP.HCM'
                  )
                }
              >
                <span aria-hidden="true">+</span> Phóng lớn ảnh bảo tàng
              </button>
              <div className="museum-grand-caption">
                <b>{heroSlide.title}</b>
                <p>{heroSlide.caption}</p>
              </div>
            </div>

            <div className="museum-hero-thumbs" role="group" aria-label="Chọn góc hình lớn giới thiệu bảo tàng">
              {MUSEUM_HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  className={idx === heroIndex ? 'active' : ''}
                  aria-pressed={idx === heroIndex}
                  onClick={() => setHeroIndex(idx)}
                >
                  <img src={mediaUrl(slide.src)} width={slide.width} height={slide.height} alt={slide.title} />
                  <span>0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="museum-grand-content">
            <div className="eyebrow">
              <i />
              CHUYÊN ĐỀ THỰC TẾ CỦA NHÓM · WAR REMNANTS MUSEUM
              <i />
            </div>
            <h1>
              Bảo tàng<br />
              <em>Chứng tích Chiến tranh</em>
            </h1>
            <p className="museum-grand-lead">
              Tọa lạc tại <strong>số 28 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</strong>, Bảo tàng Chứng tích Chiến tranh (thành lập ngày <strong>04/09/1975</strong>) là không gian di sản đặc biệt lưu giữ hơn <strong>20.000 tài liệu, hiện vật và phim ảnh</strong> về cuộc đấu tranh bảo vệ độc lập dân tộc cũng như khát vọng hòa bình của nhân dân Việt Nam.
            </p>
            <p className="museum-grand-subtext">
              Nhóm chúng mình đã trực tiếp đến tham quan, khảo sát và ghi lại bộ tư liệu hình ảnh thực tế tại các khu trưng bày ngoài trời và trong nhà của bảo tàng, nhằm kết nối mạch lịch sử từ <em>Hành trình tìm đường cứu nước (1911–1930)</em> đến những chứng tích đấu tranh giành độc lập, thống nhất đất nước.
            </p>

            <div className="meta-row museum-meta-row">
              <span>
                <Icon name="map" /> 28 Võ Văn Tần, Quận 3, TP.HCM
              </span>
              <span>
                <Icon name="book" /> 6 chuyên đề nhóm khảo sát
              </span>
              <span>
                <Icon name="spark" /> 30 ảnh thực tế của nhóm
              </span>
            </div>

            <div className="hero-actions museum-hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  document.getElementById('museum-thematic-exhibitions')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <span className="button-icon">
                  <Icon name="book" />
                </span>
                Khám phá 6 chuyên đề bảo tàng
                <Icon name="arrow" />
              </button>
              <button type="button" className="secondary-button museum-jump-game" onClick={onScrollToGame}>
                <Icon name="play" size={16} /> Đi tới Trò chơi Lịch sử (1911–1930)
              </button>
            </div>

            <blockquote>
              “Từ những hiện vật chiến tranh, bảo tàng không khơi dậy hận thù mà gửi gắm thông điệp nhân văn sâu sắc: hãy cùng nhau gìn giữ hòa bình, độc lập và tình hữu nghị giữa các dân tộc.”
            </blockquote>
          </div>
        </div>

        {/* 2. 4 THẺ CHỈ SỐ TỔNG QUAN VỀ BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH */}
        <div className="museum-facts-grid" aria-label="Thông tin tổng quan về Bảo tàng Chứng tích Chiến tranh">
          <article className="museum-fact-card">
            <span className="fact-tag">LỊCH SỬ HÌNH THÀNH</span>
            <strong>04 / 09 / 1975</strong>
            <b>Hơn 50 năm lưu giữ ký ức</b>
            <p>
              Từ “Nhà trưng bày tội ác Mỹ - Ngụy” năm 1975 đến tên gọi Bảo tàng Chứng tích Chiến tranh (từ ngày 04/07/1995), nơi đây trở thành điểm đến văn hóa – lịch sử hàng đầu tại TP. Hồ Chí Minh.
            </p>
          </article>
          <article className="museum-fact-card">
            <span className="fact-tag">QUY MÔ DI SẢN</span>
            <strong>20.000+</strong>
            <b>Tài liệu, hiện vật &amp; phim ảnh</b>
            <p>
              Hơn 1.500 tài liệu, hiện vật, phim ảnh được giới thiệu thường xuyên trong 8 chuyên đề trưng bày cố định cùng khu trưng bày vũ khí hạng nặng ngoài trời.
            </p>
          </article>
          <article className="museum-fact-card">
            <span className="fact-tag">VỊ THẾ QUỐC TẾ</span>
            <strong>INMP &amp; ICOM</strong>
            <b>Bảo tàng vì Hòa bình thế giới</b>
            <p>
              Thành viên Hệ thống các Bảo tàng vì Hòa bình thế giới (INMP) từ năm 1998 và Hội đồng Quốc tế các Bảo tàng (ICOM) từ năm 2007.
            </p>
          </article>
          <article className="museum-fact-card highlight-card">
            <span className="fact-tag">HỒ SƠ CỦA NHÓM</span>
            <strong>06 Chuyên đề</strong>
            <b>30 khung hình khảo sát thực tế</b>
            <p>
              Nhóm đã tổng hợp ảnh chụp từ 3 thư mục thực địa (<code>Dashboard</code>, <code>museum introduction</code> và <code>Scene image</code>) thành bài giới thiệu trực quan theo từng không gian trưng bày.
            </p>
          </article>
        </div>

        {/* 3. KHÁM PHÁ 6 CHUYÊN ĐỀ TRƯNG BÀY TẠI BẢO TÀNG (TỪ MUSEUM INTRODUCTION & SCENE IMAGE) */}
        <div id="museum-thematic-exhibitions" className="museum-exhibitions-block paper-card">
          <div className="exhibitions-head">
            <div>
              <span className="chapter-no">HỒ SƠ KHẢO SÁT CHI TIẾT · 6 KHÔNG GIAN TRƯNG BÀY TẠI BẢO TÀNG</span>
              <h2>Hành trình đi qua 6 chuyên đề tại Bảo tàng Chứng tích Chiến tranh</h2>
              <p>
                Chọn từng chuyên đề bên dưới để đọc nội dung thuyết minh của nhóm và xem bộ ảnh thực tế được ghi nhận tại các khu trưng bày ngoài trời và trong nhà.
              </p>
            </div>
          </div>

          {/* Thanh tab chọn 6 chuyên đề */}
          <div className="exhibition-tabs" role="tablist" aria-label="Các chuyên đề trưng bày tại Bảo tàng Chứng tích Chiến tranh">
            {MUSEUM_EXHIBITIONS.map((section, idx) => (
              <button
                key={section.id}
                role="tab"
                aria-selected={idx === exhibitIndex}
                className={`exhibition-tab-btn ${idx === exhibitIndex ? 'active' : ''}`}
                onClick={() => selectExhibition(idx)}
              >
                <span className="exhibit-tab-no">{section.number}</span>
                <span className="exhibit-tab-text">{section.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Nội dung chuyên đề đang chọn */}
          <div className="exhibition-panel" role="tabpanel">
            <div className="exhibition-story-col">
              <div className="spotlight-meta">
                <span>CHUYÊN ĐỀ {activeExhibit.number} / 06</span>
                <span>{activeExhibit.location}</span>
              </div>
              <h3>{activeExhibit.title}</h3>
              <p className="exhibition-subtitle">{activeExhibit.subtitle}</p>
              <p className="exhibition-summary">{activeExhibit.summary}</p>

              <div className="exhibition-context-box">
                <b>
                  <Icon name="book" size={16} /> Bối cảnh &amp; dữ kiện tại phòng trưng bày
                </b>
                <p>{activeExhibit.historicalContext}</p>
              </div>

              <div className="exhibition-reflection-box">
                <b>
                  <Icon name="spark" size={16} /> Ghi chép thực tế của nhóm
                </b>
                <p>“{activeExhibit.groupReflection}”</p>
              </div>

              <ul className="spotlight-highlights">
                {activeExhibit.keyFacts.map(fact => (
                  <li key={fact}>
                    <Icon name="check" size={15} />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="exhibition-gallery-col">
              <figure className="exhibition-main-figure">
                <div className="exhibition-main-img-wrap">
                  <img
                    key={activeExhibitPhoto.id}
                    src={mediaUrl(activeExhibitPhoto.src)}
                    width={activeExhibitPhoto.width}
                    height={activeExhibitPhoto.height}
                    alt={activeExhibitPhoto.caption}
                    decoding="async"
                  />
                  <span className="spotlight-counter">
                    {activeExhibitPhoto.code} · ẢNH {exhibitPhotoIndex + 1}/{activeExhibit.photos.length}
                  </span>
                  <button
                    type="button"
                    className="spotlight-zoom-btn"
                    onClick={() =>
                      openExhibitPhotoZoom(activeExhibitPhoto, activeExhibit.title, activeExhibit.location)
                    }
                  >
                    <span aria-hidden="true">+</span> Phóng lớn
                  </button>
                </div>
                <figcaption>
                  <h4>{activeExhibitPhoto.title}</h4>
                  <p>{activeExhibitPhoto.caption}</p>
                  <small>{activeExhibitPhoto.detail}</small>
                </figcaption>
              </figure>

              <div className="exhibition-Thumb-strip" role="group" aria-label={`Bộ ảnh chuyên đề ${activeExhibit.shortTitle}`}>
                {activeExhibit.photos.map((photo, pIdx) => (
                  <button
                    key={photo.id}
                    type="button"
                    className={pIdx === exhibitPhotoIndex ? 'active' : ''}
                    aria-pressed={pIdx === exhibitPhotoIndex}
                    onClick={() => setExhibitPhotoIndex(pIdx)}
                  >
                    <img src={mediaUrl(photo.src)} width={photo.width} height={photo.height} alt={photo.title} loading="lazy" />
                    <span>{photo.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. BỘ 3 KHOẢNH KHẮC TIÊU ĐIỂM CỦA NHÓM TỪ DATASET/DASHBOARD */}
        <div className="museum-showcase-wrapper">
          <div className="museum-header-block">
            <div className="eyebrow">
              <i />
              DẤU ẤN KẾT NỐI CỦA NHÓM · DATASET/DASHBOARD
              <i />
            </div>
            <h2>
              Ba khoảnh khắc <em>đồng hành &amp; giao lưu</em> tại Bảo tàng
            </h2>
            <p className="museum-lead">
              Ba bức ảnh tiêu biểu ghi lại tinh thần học tập, tái hiện biểu tượng đoàn kết quốc tế và giao lưu cùng du khách năm châu của các thành viên trong nhóm tại Bảo tàng Chứng tích Chiến tranh.
            </p>
          </div>

          <div className="museum-bento-grid">
            {/* Cột trái: Ảnh tiêu điểm lớn (Spotlight) */}
            <div className="museum-spotlight paper-card">
              <div className="spotlight-frame">
                <img
                  key={activePhoto.id}
                  src={mediaUrl(activePhoto.src)}
                  width={activePhoto.width}
                  height={activePhoto.height}
                  alt={activePhoto.caption}
                  decoding="async"
                />
                <div className="spotlight-overlay-top">
                  <span className="spotlight-badge">
                    <Icon name="compass" size={14} /> {activePhoto.badge}
                  </span>
                  <span className="spotlight-counter">
                    ẢNH NHÓM {activeIndex + 1} / {DASHBOARD_PHOTOS.length}
                  </span>
                </div>
                <button
                  className="spotlight-zoom-btn"
                  onClick={() => openDashboardPhotoZoom(activePhoto)}
                  aria-label={`Phóng lớn ảnh: ${activePhoto.title}`}
                >
                  <span aria-hidden="true">+</span> Xem ảnh lớn
                </button>
              </div>

              <div className="spotlight-body">
                <div className="spotlight-meta">
                  <span>{activePhoto.code}</span>
                  <span>{activePhoto.zone}</span>
                </div>
                <h3>{activePhoto.title}</h3>
                <p className="spotlight-story">{activePhoto.story}</p>
                <div className="spotlight-note">
                  <Icon name="book" size={18} />
                  <div>
                    <b>Ghi chú chuyên đề tại bảo tàng</b>
                    <span>{activePhoto.historicalNote}</span>
                  </div>
                </div>
                <ul className="spotlight-highlights">
                  {activePhoto.highlights.map(item => (
                    <li key={item}>
                      <Icon name="check" size={15} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="spotlight-actions">
                  <button className="primary-button" onClick={() => openDashboardPhotoZoom(activePhoto)}>
                    <Icon name="spark" size={16} /> Phóng lớn hình ảnh của nhóm
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => setActiveIndex((activeIndex + 1) % DASHBOARD_PHOTOS.length)}
                  >
                    Ảnh tiếp theo ({((activeIndex + 1) % DASHBOARD_PHOTOS.length) + 1}/{DASHBOARD_PHOTOS.length}){' '}
                    <Icon name="arrow" size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Cột phải: Bộ 3 thẻ ảnh trang trí từ dataset/Dashboard */}
            <div className="museum-photo-stack" role="region" aria-label="Bộ ảnh thực tế của nhóm tại Bảo tàng Chứng tích Chiến tranh">
              <div className="photo-stack-header">
                <span>BỘ ẢNH THỰC ĐỊA CỦA NHÓM · DATASET/DASHBOARD</span>
                <small>Chọn một khung hình để xem câu chuyện chi tiết</small>
              </div>

              {DASHBOARD_PHOTOS.map((photo, index) => {
                const isSelected = index === activeIndex;
                return (
                  <article
                    key={photo.id}
                    className={`museum-photo-card ${isSelected ? 'active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="museum-photo-thumb">
                      <img
                        src={mediaUrl(photo.src)}
                        width={photo.width}
                        height={photo.height}
                        alt={photo.title}
                        loading="lazy"
                      />
                      <span className="thumb-index">0{index + 1}</span>
                    </div>
                    <div className="museum-photo-info">
                      <small>{photo.badge}</small>
                      <h4>{photo.title}</h4>
                      <p>{photo.caption}</p>
                      <div className="museum-photo-card-footer">
                        <button
                          type="button"
                          className="text-button"
                          aria-pressed={isSelected}
                          onClick={e => {
                            e.stopPropagation();
                            setActiveIndex(index);
                          }}
                        >
                          {isSelected ? 'Đang hiển thị trên khung chính' : 'Xem trên khung chính'}
                        </button>
                        <button
                          type="button"
                          className="photo-expand-link"
                          onClick={e => {
                            e.stopPropagation();
                            openDashboardPhotoZoom(photo);
                          }}
                          aria-label={`Phóng lớn ${photo.title}`}
                        >
                          Phóng lớn ↗
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* Thẻ giới thiệu không gian Bảo tàng & Thông điệp của nhóm */}
              <div className="museum-group-quote paper-card">
                <div className="quote-seal">
                  <Icon name="book" size={20} />
                </div>
                <blockquote>
                  “Đi qua từng phòng trưng bày của Bảo tàng Chứng tích Chiến tranh, nhóm chúng mình càng thấm thía vì sao hành trình tìm đường cứu nước đầu thế kỷ XX lại mang ý nghĩa sống còn đối với vận mệnh dân tộc.”
                </blockquote>
                <cite>— Nhóm thực hiện dự án · Học phần Lịch sử Đảng Cộng sản Việt Nam</cite>
              </div>
            </div>
          </div>

          {/* 5. MẠCH KẾT NỐI 3 CHẶNG & BẢNG ĐIỀU KHIỂN TIẾN ĐỘ TRÒ CHƠI */}
          <div className="museum-connection-section paper-card">
            <div className="connection-header">
              <span className="chapter-no">SỰ KẾT NỐI NỘI DUNG TRÊN DASHBOARD</span>
              <h3>Từ không gian Bảo tàng Chứng tích Chiến tranh đến Trò chơi Lịch sử (1911–1930)</h3>
            </div>
            <div className="museum-pillars">
              {MUSEUM_PILLARS.map(pillar => (
                <article key={pillar.step} className="museum-pillar-card">
                  <span className="pillar-no">{pillar.step}</span>
                  <small>{pillar.period}</small>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.text}</p>
                </article>
              ))}
            </div>
            <div className="museum-visit-footer">
              <div className="visit-info">
                <Icon name="map" size={20} />
                <div>
                  <b>Địa điểm thực tế: Bảo tàng Chứng tích Chiến tranh (War Remnants Museum)</b>
                  <span>Số 28 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh · Mở cửa 07:30 – 17:30 hằng ngày</span>
                </div>
              </div>
              <div className="visit-actions">
                <button className="primary-button" onClick={onScrollToGame}>
                  <Icon name="play" size={16} />
                  <span>Khám phá Trò chơi Lịch sử bên dưới ↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. BẢNG TỔNG QUAN 3 TUYẾN HÀNH TRÌNH TRÒ CHƠI (DẪN VÀO PHẦN TRÒ CHƠI PHÍA DƯỚI) */}
        <div className="dashboard-game-strip paper-card">
          <div className="dashboard-strip-head">
            <div>
              <span className="chapter-no">BẢNG ĐIỀU KHIỂN TRÒ CHƠI · HÀNH TRÌNH TÌM ĐƯỜNG CỨU NƯỚC (1911–1930)</span>
              <h2>Tổng quan 3 tuyến hành trình tương tác &amp; tiến độ của bạn</h2>
            </div>
            <div className="dashboard-quick-stats" aria-label="Chỉ số tiến độ">
              <div>
                <b>{save.unlocked.length}/3</b>
                <span>Tuyến đã mở</span>
              </div>
              <div>
                <b>{save.collection.length}/9</b>
                <span>Góc kết đã mở</span>
              </div>
              <div>
                <b>{save.runs.length}</b>
                <span>Lượt hoàn thành</span>
              </div>
              <div>
                <b>30</b>
                <span>Ảnh bảo tàng</span>
              </div>
            </div>
          </div>

          <div className="dashboard-campaign-cards">
            {story.campaigns.map((c, idx) => {
              const unlocked = save.unlocked.includes(c.id);
              const isCurrent = run?.campaignId === c.id && run.phase !== 'complete';
              const completedCount = save.runs.filter(r => r.campaignId === c.id).length;
              return (
                <article key={c.id} className={`dash-campaign-card ${unlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'active' : ''}`}>
                  <div className="dash-campaign-top">
                    <span className="dash-roman">Tuyến {c.id}</span>
                    <small>
                      {isCurrent
                        ? `Đang chơi · Màn ${currentScene.order}/12`
                        : completedCount > 0
                        ? `Đã hoàn thành (${completedCount} lượt)`
                        : unlocked
                        ? 'Sẵn sàng khám phá'
                        : `Mở sau Tuyến ${c.unlockAfter}`}
                    </small>
                  </div>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                  <div className="dash-campaign-actions">
                    <button
                      className={isCurrent ? 'primary-button compact-btn' : 'secondary-button compact-btn'}
                      disabled={!unlocked}
                      onClick={() => (isCurrent ? onResumeGame() : onStartCampaign(c.id))}
                    >
                      <Icon name={unlocked ? (isCurrent ? 'play' : 'arrow') : 'lock'} size={15} />
                      <span>
                        {isCurrent
                          ? `Tiếp tục màn ${currentScene.order}/12`
                          : unlocked
                          ? `Vào tuyến ${idx + 1}`
                          : 'Chưa mở khóa'}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="dashboard-utility-bar">
            <button className="text-button" onClick={onOpenJourneys}>
              <Icon name="compass" size={16} /> Chọn tuyến hành trình
            </button>
            <button className="text-button" onClick={onOpenJournal}>
              <Icon name="book" size={16} /> Mở nhật ký &amp; ôn tập
            </button>
            <button className="text-button" onClick={onOpenCollection}>
              <Icon name="spark" size={16} /> Bộ sưu tập 9 kết thúc
            </button>
            <button className="text-button" onClick={() => onOpenHistory(0)}>
              <Icon name="info" size={16} /> 12 thẻ lịch sử &amp; 25 ảnh tư liệu
            </button>
          </div>
        </div>
      </div>

      {/* Hộp thoại phóng lớn ảnh Bảo tàng */}
      {zoomItem && (
        <Dialog title={zoomItem.title} close={() => setZoomItem(null)} wide>
          <div className="archive-zoom-image">
            <img
              src={mediaUrl(zoomItem.largeSrc || zoomItem.src)}
              width={zoomItem.width}
              height={zoomItem.height}
              alt={zoomItem.caption}
              onError={e => {
                if (e.currentTarget.getAttribute('src') !== mediaUrl(zoomItem.src)) {
                  e.currentTarget.src = mediaUrl(zoomItem.src);
                }
              }}
            />
          </div>
          <div className="history-meta">
            <span>{zoomItem.code}</span>
            <span>{zoomItem.zone}</span>
            <span>{zoomItem.badge}</span>
          </div>
          <p>
            <strong>Chú thích hình ảnh:</strong> {zoomItem.caption}
          </p>
          <p>{zoomItem.story}</p>
          <div className="notice">
            <Icon name="info" />
            <div>
              <b>Thông tin chuyên đề tại Bảo tàng Chứng tích Chiến tranh</b>
              {zoomItem.historicalNote}
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
}
