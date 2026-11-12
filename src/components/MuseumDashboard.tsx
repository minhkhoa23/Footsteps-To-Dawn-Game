import { useState } from 'react';
import { DASHBOARD_PHOTOS, mediaUrl } from '../content/media';
import type { DashboardPhoto } from '../content/media';
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
    text: 'Từ ngọn đuốc dẫn đường năm 1930, dân tộc Việt Nam đã vượt qua những cuộc kháng chiến gian khổ để giành và giữ nền độc lập. Bảo tàng Chứng tích Chiến tranh lưu giữ hơn 20.000 tài liệu, hiện vật về giai đoạn lịch sử bi tráng ấy.',
  },
  {
    step: '03',
    period: 'HÔM NAY · HÀNH TRÌNH CỦA NHÓM',
    title: 'Ký ức lịch sử & khát vọng hòa bình',
    text: 'Chuyến khảo sát thực tế của nhóm tại Bảo tàng Chứng tích Chiến tranh kết nối bài học lịch sử trên giảng đường với không gian di sản thực tế, lan tỏa thông điệp trân trọng hòa bình và hữu nghị quốc tế.',
  },
];

interface MuseumDashboardProps {
  save: Save;
  onStartCampaign: (id: CampaignId) => void;
  onResumeGame: () => void;
  onOpenHistory: (index?: number) => void;
  onOpenJournal: () => void;
  onOpenCollection: () => void;
  onOpenJourneys: () => void;
}

export function MuseumDashboard({
  save,
  onStartCampaign,
  onResumeGame,
  onOpenHistory,
  onOpenJournal,
  onOpenCollection,
  onOpenJourneys,
}: MuseumDashboardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomPhoto, setZoomPhoto] = useState<DashboardPhoto | null>(null);
  const activePhoto = DASHBOARD_PHOTOS[activeIndex];
  const run = save.current;
  const currentScene = run ? sceneById[run.sceneId] : story.scenes[0];

  return (
    <section className="dashboard-section" aria-label="Dashboard tổng quan trò chơi và giới thiệu Bảo tàng Chứng tích Chiến tranh">
      {/* Bảng điều khiển nhanh: Tổng quan tiến độ trò chơi & các tuyến hành trình */}
      <div className="dashboard-container">
        <div className="dashboard-game-strip paper-card">
          <div className="dashboard-strip-head">
            <div>
              <span className="chapter-no">BẢNG ĐIỀU KHIỂN HỌC TẬP · DASHBOARD TRÒ CHƠI & THỰC ĐỊA</span>
              <h2>Tổng quan hành trình tương tác & dự án của nhóm</h2>
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
                <b>03</b>
                <span>Ảnh thực địa nhóm</span>
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
              <Icon name="book" size={16} /> Mở nhật ký & ôn tập
            </button>
            <button className="text-button" onClick={onOpenCollection}>
              <Icon name="spark" size={16} /> Bộ sưu tập 9 kết thúc
            </button>
            <button className="text-button" onClick={() => onOpenHistory(0)}>
              <Icon name="info" size={16} /> 12 thẻ lịch sử & 25 ảnh tư liệu
            </button>
          </div>
        </div>

        {/* Chuyên mục chính: Giới thiệu Bảo tàng Chứng tích Chiến tranh của nhóm */}
        <div id="museum-dashboard" className="museum-showcase-wrapper">
          <div className="museum-header-block">
            <div className="eyebrow">
              <i />
              CHUYÊN ĐỀ THỰC TẾ CỦA NHÓM · BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH
              <i />
            </div>
            <h2>
              Giới thiệu <em>Bảo tàng Chứng tích Chiến tranh</em> &amp; hành trình khảo sát của nhóm
            </h2>
            <p className="museum-lead">
              Bên cạnh nội dung trò chơi lịch sử giai đoạn <strong>1911–1930</strong>, nhóm chúng mình đã thực hiện chuyến tham quan, học tập thực tế tại{' '}
              <strong>Bảo tàng Chứng tích Chiến tranh</strong> (số 28 Võ Văn Tần, Quận 3, TP. Hồ Chí Minh) — nơi lưu giữ những chứng tích lịch sử chân thực về cuộc đấu tranh bảo vệ độc lập dân tộc và khát vọng hòa bình của nhân dân Việt Nam.
            </p>
          </div>

          {/* 4 Thẻ thông tin tổng quan về Bảo tàng */}
          <div className="museum-facts-grid" aria-label="Thông tin tổng quan về Bảo tàng Chứng tích Chiến tranh">
            <article className="museum-fact-card">
              <span className="fact-tag">THÀNH LẬP</span>
              <strong>04 / 09 / 1975</strong>
              <b>Hơn 50 năm lưu giữ ký ức</b>
              <p>Tọa lạc tại số 28 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh; là một trong những bảo tàng thu hút đông đảo công chúng và du khách quốc tế nhất cả nước.</p>
            </article>
            <article className="museum-fact-card">
              <span className="fact-tag">QUY MÔ TRƯNG BÀY</span>
              <strong>20.000+</strong>
              <b>Tài liệu, hiện vật &amp; phim ảnh</b>
              <p>Hơn 1.500 tài liệu, hiện vật, phim ảnh được giới thiệu thường xuyên trong 8 chuyên đề trưng bày cố định cùng khu trưng bày vũ khí ngoài trời.</p>
            </article>
            <article className="museum-fact-card">
              <span className="fact-tag">THÔNG ĐIỆP QUỐC TẾ</span>
              <strong>INMP &amp; ICOM</strong>
              <b>Bảo tàng vì Hòa bình</b>
              <p>Thành viên Hệ thống các Bảo tàng vì Hòa bình thế giới (INMP) và Hội đồng Quốc tế các Bảo tàng (ICOM), truyền tải thông điệp nhân văn và hữu nghị.</p>
            </article>
            <article className="museum-fact-card highlight-card">
              <span className="fact-tag">DẤU ẤN CỦA NHÓM</span>
              <strong>03 Góc nhìn</strong>
              <b>Khảo sát &amp; kết nối thực tiễn</b>
              <p>Nhóm trực tiếp ghi hình tại các phòng trưng bày chuyên đề, giao lưu cùng bạn bè quốc tế và đối chiếu hiện vật lịch sử để làm giàu trải nghiệm dự án.</p>
            </article>
          </div>

          {/* Khung Bento Showcase trang trí bằng bộ ảnh dataset/Dashboard */}
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
                  onClick={() => setZoomPhoto(activePhoto)}
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
                  <button className="primary-button" onClick={() => setZoomPhoto(activePhoto)}>
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
                            setZoomPhoto(photo);
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

          {/* Mạch kết nối 3 chặng: Từ Trò chơi (1911-1930) đến Bảo tàng Chứng tích Chiến tranh */}
          <div className="museum-connection-section paper-card">
            <div className="connection-header">
              <span className="chapter-no">SỰ KẾT NỐI NỘI DUNG TRÊN DASHBOARD</span>
              <h3>Từ hành trình tìm đường cứu nước (1911–1930) đến không gian Bảo tàng Chứng tích Chiến tranh</h3>
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
                <button className="primary-button" onClick={() => (run ? onResumeGame() : onStartCampaign('I'))}>
                  <Icon name="play" size={16} />
                  <span>{run ? `Tiếp tục trò chơi (${campaignById[run.campaignId].name})` : 'Bắt đầu trò chơi lịch sử'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hộp thoại phóng lớn ảnh từ dataset/Dashboard */}
      {zoomPhoto && (
        <Dialog title={zoomPhoto.title} close={() => setZoomPhoto(null)} wide>
          <div className="archive-zoom-image">
            <img
              src={mediaUrl(zoomPhoto.largeSrc)}
              width={zoomPhoto.width}
              height={zoomPhoto.height}
              alt={zoomPhoto.caption}
              onError={e => {
                if (e.currentTarget.getAttribute('src') !== mediaUrl(zoomPhoto.src)) {
                  e.currentTarget.src = mediaUrl(zoomPhoto.src);
                }
              }}
            />
          </div>
          <div className="history-meta">
            <span>{zoomPhoto.code}</span>
            <span>{zoomPhoto.zone}</span>
            <span>{zoomPhoto.badge}</span>
          </div>
          <p>
            <strong>Chú thích hình ảnh:</strong> {zoomPhoto.caption}
          </p>
          <p>{zoomPhoto.story}</p>
          <div className="notice">
            <Icon name="info" />
            <div>
              <b>Bối cảnh trưng bày tại Bảo tàng Chứng tích Chiến tranh</b>
              {zoomPhoto.historicalNote}
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
}
