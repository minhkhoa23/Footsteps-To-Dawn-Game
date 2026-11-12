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
export interface DashboardPhoto {
  id: string;
  code: string;
  fileOrigin: string;
  title: string;
  zone: string;
  badge: string;
  src: string;
  largeSrc: string;
  width: number;
  height: number;
  caption: string;
  story: string;
  historicalNote: string;
  highlights: string[];
}

export const DASHBOARD_PHOTOS: DashboardPhoto[] = [
  {
    id: 'dashboard-01',
    code: 'BT-01',
    fileOrigin: 'dataset/Dashboard/IMG_2769.png',
    title: 'Tinh thần đoàn kết quốc tế & khát vọng hòa bình',
    zone: 'Chuyên đề: Thế giới ủng hộ Việt Nam kháng chiến',
    badge: 'ĐOÀN KẾT QUỐC TẾ',
    src: 'images/dashboard/dashboard-01.webp',
    largeSrc: 'images/dashboard/dashboard-01-large.webp',
    width: 1280,
    height: 960,
    caption:
      'Hai thành viên của nhóm tái hiện cái bắt tay hữu nghị trước bức ảnh lịch sử Chủ tịch Hồ Chí Minh và Chủ tịch Mao Trạch Đông cùng các bức ảnh phong trào nhân dân thế giới xuống đường ủng hộ Việt Nam.',
    story:
      'Tại không gian trưng bày “Thế giới ủng hộ Việt Nam kháng chiến”, nhóm dừng chân trước những khung hình ghi lại phong trào nhân dân khắp các châu lục (Indonesia, Pakistan, Trung Quốc và nhiều quốc gia khác) biểu tình ủng hộ cuộc đấu tranh chính nghĩa của dân tộc Việt Nam. Khoảnh khắc cái bắt tay của hai thành viên thể hiện sự tiếp nối tinh thần đoàn kết quốc tế và lòng biết ơn của thế hệ trẻ hôm nay.',
    historicalNote:
      'Chuyên đề trưng bày hàng trăm bức ảnh, biểu ngữ và hiện vật về phong trào nhân dân thế giới — bao gồm cả phong trào phản chiến ngay tại Pháp và Mỹ — sát cánh cùng Việt Nam vì độc lập dân tộc và hòa bình.',
    highlights: [
      'Đối chiếu tư liệu phong trào quốc tế ủng hộ Việt Nam',
      'Kết nối mạch tư tưởng đoàn kết quốc tế từ giai đoạn 1911–1930',
      'Thông điệp hữu nghị, hợp tác và gìn giữ hòa bình của sinh viên',
    ],
  },
  {
    id: 'dashboard-02',
    code: 'BT-02',
    fileOrigin: 'dataset/Dashboard/IMG_2787.png',
    title: 'Gặp gỡ bạn bè quốc tế giữa không gian ký ức lịch sử',
    zone: 'Khu trưng bày vũ khí & hiện vật kháng chiến',
    badge: 'GIAO LƯU QUỐC TẾ',
    src: 'images/dashboard/dashboard-02.webp',
    largeSrc: 'images/dashboard/dashboard-02-large.webp',
    width: 1280,
    height: 960,
    caption:
      'Ba thành viên trong nhóm giao lưu và chụp ảnh lưu niệm cùng một vị khách quốc tế trước tủ kính trưng bày các loại súng bộ binh tại Bảo tàng Chứng tích Chiến tranh.',
    story:
      'Trong buổi khảo sát thực tế tại bảo tàng, nhóm có dịp trò chuyện và chụp ảnh kỷ niệm cùng du khách nước ngoài đến tìm hiểu lịch sử Việt Nam. Đứng trước những tủ kính trưng bày vũ khí từng đi qua chiến tranh, nụ cười thân thiện của những người trẻ đến từ các quốc gia khác nhau là minh chứng sống động rằng bảo tàng không khơi gợi hận thù, mà là nhịp cầu của sự thấu hiểu, sẻ chia và hòa bình.',
    historicalNote:
      'Bảo tàng Chứng tích Chiến tranh là thành viên Hệ thống các Bảo tàng vì Hòa bình thế giới (INMP) và Hội đồng Quốc tế các Bảo tàng (ICOM), đón hàng trăm nghìn lượt khách trong nước và quốc tế mỗi năm.',
    highlights: [
      'Giao lưu trực tiếp với du khách quốc tế tham quan bảo tàng',
      'Trưng bày các loại súng bộ binh, súng máy gắn với chiến trường Việt Nam',
      'Lan tỏa thông điệp bảo tàng vì hòa bình và sự đồng cảm giữa các dân tộc',
    ],
  },
  {
    id: 'dashboard-03',
    code: 'BT-03',
    fileOrigin: 'dataset/Dashboard/IMG_2780.png',
    title: 'Trực tiếp khảo sát hiện vật & đối chiếu tư liệu chiến tranh',
    zone: 'Tầng trưng bày chuyên đề vũ khí, đạn pháo & chứng tích',
    badge: 'KHẢO SÁT HIỆN VẬT',
    src: 'images/dashboard/dashboard-03.webp',
    largeSrc: 'images/dashboard/dashboard-03-large.webp',
    width: 1280,
    height: 960,
    caption:
      'Ba thành viên của nhóm cùng ghi lại khoảnh khắc học tập thực tế bên tủ kính trưng bày các đầu đạn pháo, đạn cối và vũ khí được lưu giữ tại bảo tàng.',
    story:
      'Thay vì chỉ tiếp cận lịch sử qua trang sách, chuyến đi thực tế giúp các thành viên trực tiếp quan sát từng hiện vật đạn pháo, vũ khí và đọc kỹ các bảng chú dẫn tại bảo tàng. Trải nghiệm trực quan này giúp cả nhóm cảm nhận rõ hơn cái giá của độc lập, tự do và có thêm chất liệu chân thực để hoàn thiện dự án học tập môn Lịch sử Đảng Cộng sản Việt Nam.',
    historicalNote:
      'Các tủ trưng bày hiện vật vũ khí, đạn dược tại bảo tàng đi kèm số liệu và hồ sơ cụ thể, giúp người xem hình dung quy mô ác liệt của chiến tranh cũng như ý chí kiên cường của quân và dân Việt Nam.',
    highlights: [
      'Quan sát trực tiếp hiện vật đầu đạn pháo, đạn cối trong tủ kính bảo quản',
      'Thu thập tư liệu thực tế phục vụ bài tập lớn môn Lịch sử Đảng',
      'Kết nối trải nghiệm tham quan bảo tàng với thiết kế trò chơi lịch sử',
    ],
  },
];

export const historyMedia = data as { version: number; catalogDate: string; assets: HistoricalImage[]; stages: StageMedia[] };
export const imageById = Object.fromEntries(historyMedia.assets.map(asset => [asset.id, asset]));
export function mediaForStage(order: number): StageMedia {
  const stage = historyMedia.stages.find(stage => stage.order === order);
  if (!stage) throw new Error(`Missing historical media for stage ${order}`);
  return stage;
}

// Relative URLs keep the bundled images working when deployed below a subpath.
export function mediaUrl(path: string) { return `${import.meta.env.BASE_URL}${path}`; }
