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

export interface MuseumExhibitPhoto {
  id: string;
  code: string;
  fileOrigin: string;
  title: string;
  src: string;
  width: number;
  height: number;
  caption: string;
  detail: string;
}

export interface MuseumExhibitionSection {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  location: string;
  summary: string;
  historicalContext: string;
  groupReflection: string;
  keyFacts: string[];
  photos: MuseumExhibitPhoto[];
}

export const MUSEUM_HERO_SLIDES: MuseumExhibitPhoto[] = [
  {
    id: 'outdoor-01',
    code: 'HERO-01',
    fileOrigin: 'dataset/museum introduction/IMG_2826.png',
    title: 'Không gian Bảo tàng Chứng tích Chiến tranh — Khu trưng bày ngoài trời & khối nhà chính',
    src: 'images/dashboard/outdoor-01.webp',
    width: 1600,
    height: 1200,
    caption: 'Toàn cảnh sân trưng bày ngoài trời với kiến trúc Bảo tàng Chứng tích Chiến tranh, hệ thống pháo binh, xe thiết giáp và hai thành viên nhóm trong chuyến khảo sát thực tế.',
    detail: 'Bảo tàng Chứng tích Chiến tranh tại số 28 Võ Văn Tần, Quận 3, TP. Hồ Chí Minh kết hợp không gian trưng bày hiện vật cỡ lớn ngoài trời với 3 tầng trưng bày chuyên đề bên trong tòa nhà chính.',
  },
  {
    id: 'outdoor-02',
    code: 'HERO-02',
    fileOrigin: 'dataset/museum introduction/IMG_2819.png',
    title: 'Khuôn viên sân trước Bảo tàng cùng máy bay tiêm kích F-5E',
    src: 'images/dashboard/outdoor-02.webp',
    width: 960,
    height: 1280,
    caption: 'Hai thành viên nhóm đứng trước máy bay tiêm kích F-5E và khối nhà trưng bày chính của Bảo tàng Chứng tích Chiến tranh giữa bầu trời TP. Hồ Chí Minh.',
    detail: 'Khu vực sân trước là điểm đón đầu tiên khi bước vào bảo tàng, giới thiệu các phương tiện chiến tranh nguyên bản của Không quân và Lục quân Hoa Kỳ từng tham chiến tại Việt Nam.',
  },
  {
    id: 'truth-03',
    code: 'HERO-03',
    fileOrigin: 'dataset/museum introduction/IMG_2781.png',
    title: 'Không gian trưng bày hiện vật bên trong Bảo tàng Chứng tích Chiến tranh',
    src: 'images/dashboard/truth-03.webp',
    width: 1400,
    height: 1050,
    caption: 'Hai thành viên của nhóm lặng mình quan sát hệ thống tủ kính trưng bày vũ khí và tư liệu lịch sử bên trong bảo tàng.',
    detail: 'Cách bài trí hiện vật kết hợp ánh sáng tiêu điểm và bảng chú dẫn song ngữ Việt – Anh giúp người xem đối chiếu trực diện với từng giai đoạn lịch sử.',
  },
  {
    id: 'press-01',
    code: 'HERO-04',
    fileOrigin: 'dataset/museum introduction/IMG_2760.png',
    title: 'Không gian tái hiện chiến khu rừng ngập mặn & tuyến tiếp tế kháng chiến',
    src: 'images/dashboard/press-01.webp',
    width: 1400,
    height: 1050,
    caption: 'Tổ hợp mô hình tái hiện cảnh chiến khu rừng Sác, xuồng gỗ vận chuyển đạn dược và lán trại kháng chiến bên trong bảo tàng.',
    detail: 'Bên cạnh các hiện vật trong tủ kính, bảo tàng còn dựng các tổ hợp không gian thực cảnh giúp khách tham quan hình dung điều kiện chiến đấu gian khổ của quân và dân miền Nam.',
  },
  {
    id: 'dashboard-02',
    code: 'HERO-05',
    fileOrigin: 'dataset/Dashboard/IMG_2787.png',
    title: 'Điểm hẹn giao lưu quốc tế vì hòa bình và sự thấu hiểu lịch sử',
    src: 'images/dashboard/dashboard-02.webp',
    width: 1400,
    height: 1050,
    caption: 'Nhóm thực hiện dự án giao lưu cùng du khách quốc tế ngay tại phòng trưng bày của Bảo tàng Chứng tích Chiến tranh.',
    detail: 'Hơn cả một nơi lưu giữ ký ức chiến tranh, bảo tàng hôm nay là không gian đối thoại văn hóa và lan tỏa thông điệp hòa bình tới bạn bè năm châu.',
  },
];

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
    width: 1400,
    height: 1050,
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
    width: 1400,
    height: 1050,
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
    width: 1400,
    height: 1050,
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

export const MUSEUM_EXHIBITIONS: MuseumExhibitionSection[] = [
  {
    id: 'outdoor',
    number: '01',
    shortTitle: 'Trưng bày Ngoài trời',
    title: 'Khu trưng bày ngoài trời: Vũ khí, Máy bay & Phương tiện Chiến tranh cỡ lớn',
    subtitle: 'Bộ sưu tập hiện vật quân sự nguyên bản tại khuôn viên sân Bảo tàng Chứng tích Chiến tranh',
    location: 'Sân trưng bày ngoài trời · Tầng trệt Bảo tàng (28 Võ Văn Tần)',
    summary:
      'Ngay khi bước qua cổng Bảo tàng Chứng tích Chiến tranh, khách tham quan bắt gặp khu trưng bày ngoài trời quy mô lớn với các loại máy bay tiêm kích, trực thăng vận tải, xe tăng, pháo mặt đất và bom đạn hạng nặng từng được quân đội Mỹ sử dụng tại chiến trường Việt Nam.',
    historicalContext:
      'Các hiện vật như máy bay tiêm kích F-5E, trực thăng vận tải CH-47 Chinook, xe tăng M48A3 Patton, pháo 155mm M114 và pháo tự hành 175mm M107 (“Vua chiến trường”) giúp người xem hình dung sự chênh lệch to lớn về vũ khí kỹ thuật, đồng thời tôn vinh bản lĩnh kiên cường của quân và dân Việt Nam trong cuộc kháng chiến bảo vệ độc lập.',
    groupReflection:
      'Đứng trực tiếp bên cạnh những cỗ máy chiến tranh khổng lồ giữa bầu trời hòa bình của TP. Hồ Chí Minh hôm nay, các thành viên trong nhóm cảm nhận rõ nét sự đối lập giữa quá khứ khói lửa và cuộc sống thanh bình mà các thế hệ cha anh đã đánh đổi.',
    keyFacts: [
      'Trưng bày máy bay tiêm kích F-5E, cường kích A-37, trực thăng UH-1 và CH-47 Chinook số hiệu 086',
      'Tổ hợp xe tăng M48A3 Patton, thiết giáp M113 cùng các loại pháo mặt đất 105mm, 155mm và 175mm',
      'Mỗi hiện vật đều có bảng thông số kỹ thuật và bối cảnh thu giữ trên chiến trường',
    ],
    photos: [
      {
        id: 'outdoor-01',
        code: 'NT-01',
        fileOrigin: 'dataset/museum introduction/IMG_2826.png',
        title: 'Sân trưng bày pháo binh, tháp pháo & xe thiết giáp ngoài trời',
        src: 'images/dashboard/outdoor-01.webp',
        width: 1600,
        height: 1200,
        caption: 'Hai thành viên nhóm khảo sát khu vực trưng bày cụm pháo phòng không, tháp pháo và xe thiết giáp tự hành trong sân bảo tàng.',
        detail: 'Phía sau là hành lang kính kết nối khu vực sảnh chính của bảo tàng với sân trưng bày hiện vật quân sự cỡ lớn.',
      },
      {
        id: 'outdoor-02',
        code: 'NT-02',
        fileOrigin: 'dataset/museum introduction/IMG_2819.png',
        title: 'Khảo sát máy bay tiêm kích F-5E tại sân trước bảo tàng',
        src: 'images/dashboard/outdoor-02.webp',
        width: 960,
        height: 1280,
        caption: 'Hai thành viên nhóm chụp ảnh bên chiếc máy bay tiêm kích phản lực Northrop F-5E cùng khối nhà trưng bày chính.',
        detail: 'F-5E là loại máy bay tiêm kích siêu âm từng được sử dụng rộng rãi trong giai đoạn cuối của cuộc chiến tranh tại miền Nam Việt Nam.',
      },
      {
        id: 'outdoor-03',
        code: 'NT-03',
        fileOrigin: 'dataset/museum introduction/IMG_2821.png',
        title: 'Hiện vật xe tăng hạng trung M48A3 Patton',
        src: 'images/dashboard/outdoor-03.webp',
        width: 960,
        height: 1280,
        caption: 'Thành viên nhóm đứng bên cạnh xe tăng M48A3 Patton mang số hiệu 287439 được bảo quản tại khu trưng bày ngoài trời.',
        detail: 'Xe tăng M48A3 trang bị pháo chính 90mm, từng là phương tiện đột kích chủ lực của lục quân Mỹ và quân đội Sài Gòn.',
      },
      {
        id: 'outdoor-04',
        code: 'NT-04',
        fileOrigin: 'dataset/museum introduction/IMG_2822.png',
        title: 'Trực thăng vận tải hạng nặng CH-47 Chinook (số hiệu 086)',
        src: 'images/dashboard/outdoor-04.webp',
        width: 960,
        height: 1280,
        caption: 'Thành viên nhóm giới thiệu chiếc trực thăng hai cánh quạt CH-47A Chinook cùng bảng thuyết minh song ngữ.',
        detail: 'CH-47 Chinook được dùng để cơ động quân, vận chuyển pháo binh và tiếp tế hậu cần hạng nặng trên các địa hình hiểm trở.',
      },
      {
        id: 'outdoor-05',
        code: 'NT-05',
        fileOrigin: 'dataset/museum introduction/IMG_2823.png',
        title: 'Lựu pháo mặt đất 155mm M114 tại khu trưng bày ngoài trời',
        src: 'images/dashboard/outdoor-05.webp',
        width: 960,
        height: 1280,
        caption: 'Hai thành viên nhóm bên khẩu pháo mặt đất 155mm M114 và bảng thông tin kỹ thuật tại sân bảo tàng.',
        detail: 'Khu vực ngoài trời được phủ bóng cây xanh mát, tạo không gian thuận lợi để sinh viên và du khách tìm hiểu chi tiết từng hiện vật.',
      },
    ],
  },
  {
    id: 'world-support',
    number: '02',
    shortTitle: 'Thế giới Ủng hộ & Ngoại giao',
    title: 'Thế giới Ủng hộ Việt Nam Kháng chiến & Dấu ấn Ngoại giao Hòa bình',
    subtitle: 'Từ tình đoàn kết năm châu đến bản lĩnh ngoại giao của phái đoàn Việt Nam tại Hội nghị Paris',
    location: 'Tầng trệt & Tầng 1 · Chuyên đề Quốc tế & Chuyên đề Nguyễn Thị Bình',
    summary:
      'Một trong những không gian gây xúc động mạnh mẽ nhất đối với nhóm là khu trưng bày chuyên đề “Thế giới ủng hộ Việt Nam kháng chiến” và không gian trưng bày về nhà ngoại giao Nguyễn Thị Bình. Tại đây, hàng trăm bức ảnh, áp phích, truyền đơn và kỷ vật từ khắp châu Á, châu Âu, châu Mỹ Latinh, châu Phi và châu Đại Dương đã tái hiện làn sóng đoàn kết quốc tế rộng lớn chưa từng có.',
    historicalContext:
      'Sự kết hợp chặt chẽ giữa sức mạnh dân tộc với sức mạnh thời đại — một bài học cốt lõi được đặt nền móng từ hành trình tìm đường cứu nước của Nguyễn Ái Quốc giai đoạn 1911–1930 — đã phát huy rực rỡ trong cuộc kháng chiến chống ngoại xâm, kết hợp ba mặt trận quân sự, chính trị và ngoại giao.',
    groupReflection:
      'Khi nhìn thấy những khẩu hiệu “Paix au Vietnam” (Pháp), “Il Vietnam è la nostra coscienza” (Ý), tình đoàn kết của nhân dân Cuba, Mỹ Latinh và hình ảnh bà Nguyễn Thị Bình tại Hội nghị Paris, nhóm càng hiểu rõ giá trị của đường lối đối ngoại độc lập, tự chủ và đoàn kết quốc tế của Đảng.',
    keyFacts: [
      'Lưu giữ tư liệu về phong trào nhân dân khắp 5 châu lục và ngay trong lòng nước Mỹ ủng hộ Việt Nam',
      'Không gian chuyên đề tôn vinh bà Nguyễn Thị Bình — Bộ trưởng Ngoại giao Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam',
      'Trưng bày báo chí quốc tế, áp phích phản chiến và trang phục áo dài ngoại giao lịch sử',
    ],
    photos: [
      {
        id: 'dashboard-01',
        code: 'QT-01',
        fileOrigin: 'dataset/Dashboard/IMG_2769.png',
        title: 'Tái hiện cái bắt tay đoàn kết quốc tế trước bức ảnh lịch sử',
        src: 'images/dashboard/dashboard-01.webp',
        width: 1400,
        height: 1050,
        caption: 'Hai thành viên nhóm bắt tay hữu nghị trước bức ảnh tư liệu Chủ tịch Hồ Chí Minh và Chủ tịch Mao Trạch Đông cùng các hình ảnh nhân dân châu Á ủng hộ Việt Nam.',
        detail: 'Khoảnh khắc tiêu biểu của nhóm trong chuyên đề “Thế giới ủng hộ Việt Nam kháng chiến”.',
      },
      {
        id: 'world-02',
        code: 'QT-02',
        fileOrigin: 'dataset/museum introduction/IMG_2790.png',
        title: 'Không gian trưng bày chuyên đề “Madame Bình — Trí tuệ, Bản lĩnh”',
        src: 'images/dashboard/world-02.webp',
        width: 900,
        height: 1200,
        caption: 'Thành viên nhóm chăm chú tìm hiểu lồng kính trưng bày chiếc áo dài truyền thống và tư liệu ngoại giao của bà Nguyễn Thị Bình.',
        detail: 'Hình ảnh người phụ nữ Việt Nam mặc áo dài trên bàn đàm phán Hội nghị Paris (1968–1973) đã trở thành biểu tượng của ngoại giao hòa bình và bản lĩnh dân tộc.',
      },
      {
        id: 'world-03',
        code: 'QT-03',
        fileOrigin: 'dataset/Scene image/IMG_2792.png',
        title: 'Tượng chân dung Nguyễn Thị Bình & thông điệp “Live Like Her”',
        src: 'images/dashboard/world-03.webp',
        width: 900,
        height: 1200,
        caption: 'Tượng đồng chân dung bà Nguyễn Thị Bình — Bộ trưởng Bộ Ngoại giao Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam (tác giả Trần Thanh Phong).',
        detail: 'Tác phẩm tôn vinh trí tuệ, phong thái điềm tĩnh nhưng kiên quyết của nhà ngoại giao kiệt xuất trên trường quốc tế.',
      },
      {
        id: 'world-04',
        code: 'QT-04',
        fileOrigin: 'dataset/Scene image/IMG_2773.png',
        title: 'Phong trào đoàn kết của nhân dân Cuba và châu Mỹ Latinh',
        src: 'images/dashboard/world-04.webp',
        width: 1200,
        height: 900,
        caption: 'Khu vực trưng bày cờ Mặt trận Dân tộc Giải phóng miền Nam Việt Nam, cờ Cuba và các áp phích đoàn kết từ Argentina, Chile, Mexico, Venezuela, Canada.',
        detail: 'Khắc họa tình đoàn kết thủy chung của nhân dân Cuba và các nước Mỹ Latinh dành cho cuộc đấu tranh chính nghĩa của Việt Nam.',
      },
      {
        id: 'world-05',
        code: 'QT-05',
        fileOrigin: 'dataset/Scene image/IMG_2774.png',
        title: 'Phong trào nhân dân châu Âu & châu Đại Dương đòi hòa bình cho Việt Nam',
        src: 'images/dashboard/world-05.webp',
        width: 1200,
        height: 900,
        caption: 'Thành viên nhóm bên bức tường trưng bày phong trào biểu tình phản chiến tại Pháp, Ý, Anh, Thụy Điển, Hà Lan, Úc và New Zealand.',
        detail: 'Phía trên là biểu ngữ nổi tiếng bằng tiếng Ý: “Il Vietnam è la nostra coscienza” (Việt Nam là lương tri của chúng ta).',
      },
    ],
  },
  {
    id: 'historical-truths',
    number: '03',
    shortTitle: 'Sự thật Lịch sử & Vũ khí',
    title: 'Những Sự thật Lịch sử, Quy mô Chiến tranh & Hiện vật Vũ khí',
    subtitle: 'Từ bản Tuyên ngôn Độc lập 2/9/1945 đến các số liệu đối chiếu và tủ trưng bày vũ khí chiến trường',
    location: 'Tầng 1 & Tầng 2 · Chuyên đề Những sự thật lịch sử & Tội ác chiến tranh',
    summary:
      'Mạch trưng bày mở đầu bằng bản Tuyên ngôn Độc lập ngày 2/9/1945 do Chủ tịch Hồ Chí Minh đọc tại Quảng trường Ba Đình — khẳng định quyền dân tộc cơ bản của nước Việt Nam mới. Tiếp nối là hệ thống bản đồ, biểu đồ thống kê và các tủ kính trưng bày vũ khí, đạn pháo giúp người xem nhìn nhận toàn diện quy mô khốc liệt của cuộc chiến.',
    historicalContext:
      'Bảng số liệu so sánh 3 cuộc chiến tranh Mỹ từng tham gia (Thế chiến II, Chiến tranh Triều Tiên và Chiến tranh Việt Nam) cho thấy tại Việt Nam, khối lượng bom đạn và thuốc nổ được sử dụng lên tới 14.300.000 tấn — gấp gần 3 lần Thế chiến II (5.000.000 tấn) và gấp hơn 5 lần Chiến tranh Triều Tiên (2.600.000 tấn).',
    groupReflection:
      'Việc khảo sát trực tiếp từ trang Tuyên ngôn Độc lập đến các bảng thống kê bom đạn và hệ thống tủ trưng bày vũ khí giúp nhóm xâu chuỗi trọn vẹn: vì sao độc lập dân tộc giành được năm 1945 lại phải bảo vệ bằng biết bao máu xương trong suốt 30 năm tiếp theo.',
    keyFacts: [
      'Trưng bày trang trọng bản Tuyên ngôn Độc lập (2/9/1945) và hình ảnh ngày Quốc khánh đầu tiên',
      'Bảng đối chiếu 17 năm 2 tháng chiến tranh tại Việt Nam với 14,3 triệu tấn bom đạn và 676 tỷ USD chi phí',
      'Hệ thống tủ kính bảo quản súng bộ binh, súng phóng lựu, đạn pháo, đạn cối và đạn sát thương',
    ],
    photos: [
      {
        id: 'truth-01',
        code: 'LS-01',
        fileOrigin: 'dataset/Scene image/IMG_2809.png',
        title: 'Bản in Tuyên ngôn Độc lập ngày 2/9/1945 của Chủ tịch Hồ Chí Minh',
        src: 'images/dashboard/truth-01.webp',
        width: 900,
        height: 1200,
        caption: 'Văn kiện Tuyên ngôn Độc lập được đặt trang trọng trên bục đỏ tại không gian mở đầu chuyên đề “Những sự thật lịch sử”.',
        detail: 'Dấu mốc kết tinh từ hành trình tìm đường cứu nước (1911–1930) và thắng lợi của Cách mạng Tháng Tám năm 1945.',
      },
      {
        id: 'truth-02',
        code: 'LS-02',
        fileOrigin: 'dataset/museum introduction/IMG_2803.png',
        title: 'Bảng so sánh 3 cuộc chiến tranh Mỹ đã tham gia',
        src: 'images/dashboard/truth-02.webp',
        width: 900,
        height: 1200,
        caption: 'Bảng đồ họa đối chiếu thời gian, quân số, khối lượng bom đạn (14,3 triệu tấn) và chi phí chiến tranh tại Việt Nam so với Thế chiến II và Chiến tranh Triều Tiên.',
        detail: 'Tư liệu trực quan giúp người học nắm bắt ngay quy mô khốc liệt chưa từng có của cuộc chiến tranh tại Việt Nam.',
      },
      {
        id: 'truth-03',
        code: 'LS-03',
        fileOrigin: 'dataset/museum introduction/IMG_2781.png',
        title: 'Hai thành viên nhóm trước ba tủ kính trưng bày súng bộ binh & súng máy',
        src: 'images/dashboard/truth-03.webp',
        width: 1400,
        height: 1050,
        caption: 'Góc nhìn đối xứng ghi lại khoảnh khắc hai thành viên nhóm quan sát các mẫu súng máy, súng trường và vũ khí bộ binh.',
        detail: 'Mỗi hiện vật đều gắn kèm hình ảnh tư liệu chiến trường và chú thích kỹ thuật chi tiết.',
      },
      {
        id: 'dashboard-02',
        code: 'LS-04',
        fileOrigin: 'dataset/Dashboard/IMG_2787.png',
        title: 'Giao lưu cùng du khách quốc tế tại phòng trưng bày vũ khí',
        src: 'images/dashboard/dashboard-02.webp',
        width: 1400,
        height: 1050,
        caption: 'Ba thành viên nhóm cùng vị khách quốc tế chụp ảnh kỷ niệm trước tủ trưng bày súng bộ binh.',
        detail: 'Không gian học tập cởi mở, kết nối sinh viên Việt Nam với bạn bè quốc tế cùng tìm hiểu lịch sử.',
      },
      {
        id: 'dashboard-03',
        code: 'LS-05',
        fileOrigin: 'dataset/Dashboard/IMG_2780.png',
        title: 'Nhóm khảo sát tủ kính trưng bày đầu đạn pháo & đạn cối',
        src: 'images/dashboard/dashboard-03.webp',
        width: 1400,
        height: 1050,
        caption: 'Ba thành viên nhóm bên tủ kính trưng bày các loại đạn ĐKZ, đạn cối 81mm, 60mm và đạn pháo 40mm.',
        detail: 'Quan sát trực tiếp cấu tạo các loại đầu đạn và vũ khí sát thương được bảo tàng lưu giữ.',
      },
    ],
  },
  {
    id: 'agent-orange',
    number: '04',
    shortTitle: 'Chất độc Da cam / Dioxin',
    title: 'Hậu quả Chất độc Da cam / Dioxin & Nỗi đau Kéo dài sau Chiến tranh',
    subtitle: 'Chứng tích chiến tranh hóa học, nghị lực sống của các nạn nhân và nỗ lực khắc phục hậu quả',
    location: 'Tầng 1 & Tầng 2 · Chuyên đề Hậu quả Chất độc Da cam trong chiến tranh ở Việt Nam',
    summary:
      'Phòng trưng bày chuyên đề về Chất độc Da cam / Dioxin mang tông màu cam – đen trầm lắng, ghi lại hậu quả nặng nề của Chiến dịch Ranch Hand (1961–1971) đối với môi trường sinh thái và nhiều thế hệ con người Việt Nam, đồng thời phản ánh nghị lực vươn lên của các nạn nhân cùng nỗ lực hợp tác quốc tế xử lý ô nhiễm dioxin hôm nay.',
    historicalContext:
      'Theo bảng thuyết minh tại bảo tàng, từ năm 1961 đến năm 1971, quân đội Mỹ đã thực hiện 19.905 phi vụ, phun rải khoảng 80 triệu lít chất độc hóa học (61% là chất da cam chứa khoảng 366 kg dioxin) xuống gần 26.000 thôn bản với diện tích 3,06 triệu ha ở miền Nam Việt Nam.',
    groupReflection:
      'Đứng trước bức tượng “Bà Mẹ” ghép từ mảnh bom và bức ảnh nụ cười của em Nguyễn Thị Nhàn sau khung cửa gỗ, cả nhóm lặng người trước nỗi đau dai dẳng của chiến tranh ngay cả khi tiếng súng đã ngừng từ lâu.',
    keyFacts: [
      '19.905 phi vụ phun rải khoảng 80 triệu lít chất độc hóa học xuống 3,06 triệu ha rừng và ruộng đồng miền Nam',
      'Tác phẩm điêu khắc “Bà Mẹ” (ghép từ mảnh bom) của tác giả Nguyễn Hoàng Huy — biểu tượng nỗi đau và sức chịu đựng của người mẹ Việt Nam',
      'Trưng bày các dự án hợp tác tẩy độc dioxin tại sân bay Đà Nẵng, Biên Hòa, Phù Cát và hỗ trợ nạn nhân da cam',
    ],
    photos: [
      {
        id: 'dioxin-01',
        code: 'DC-01',
        fileOrigin: 'dataset/museum introduction/IMG_2788.png',
        title: 'Tác phẩm điêu khắc “Bà Mẹ” (Mảnh bom ghép)',
        src: 'images/dashboard/dioxin-01.webp',
        width: 900,
        height: 1200,
        caption: 'Tượng “Bà Mẹ” được hàn ghép từ những mảnh vỏ bom rỉ sét của tác giả Nguyễn Hoàng Huy (Tây Ninh) đặt tại sảnh bảo tàng.',
        detail: 'Tác phẩm đạt Giải Khuyến khích Triển lãm 10 năm Điêu khắc Toàn quốc (1983–1993), khắc họa hình ảnh người mẹ hóa thân từ thương tích chiến tranh.',
      },
      {
        id: 'dioxin-02',
        code: 'DC-02',
        fileOrigin: 'dataset/Scene image/IMG_2797.png',
        title: 'Không gian trưng bày Chiến dịch Ranch Hand (1961–1971)',
        src: 'images/dashboard/dioxin-02.webp',
        width: 1200,
        height: 900,
        caption: 'Bức tường cam trưng bày huy hiệu chiến dịch Ranch Hand, ảnh máy bay phun rải chất độc hóa học và tủ kính chứa mặt nạ phòng độc.',
        detail: 'Bảng thông tin nêu rõ số liệu 80 triệu lít chất độc hóa học đã bị phun rải xuống gần 1/4 diện tích miền Nam Việt Nam.',
      },
      {
        id: 'dioxin-03',
        code: 'DC-03',
        fileOrigin: 'dataset/Scene image/IMG_2796.png',
        title: 'Nụ cười kiên cường của nạn nhân chất độc da cam',
        src: 'images/dashboard/dioxin-03.webp',
        width: 1200,
        height: 900,
        caption: 'Bức ảnh tư liệu chụp cô Nguyễn Thị Nhàn (21 tuổi, Thái Bình) — nạn nhân di chứng chất độc da cam từ người cha từng chiến đấu ở Trường Sơn (Ảnh: Đoàn Đức Minh).',
        detail: 'Một trong những khung hình gây xúc động sâu sắc nhất tại phòng trưng bày chất độc da cam.',
      },
      {
        id: 'dioxin-04',
        code: 'DC-04',
        fileOrigin: 'dataset/museum introduction/IMG_2794.png',
        title: 'Hợp tác quốc tế khắc phục hậu quả chất độc hóa học/dioxin',
        src: 'images/dashboard/dioxin-04.webp',
        width: 1200,
        height: 900,
        caption: 'Khu vực trưng bày tranh sơn dầu cùng các bảng tư liệu về dự án xử lý ô nhiễm dioxin tại sân bay Đà Nẵng, Biên Hòa và Phù Cát.',
        detail: 'Thể hiện nỗ lực chung của Việt Nam và cộng đồng quốc tế trong việc hàn gắn vết thương chiến tranh và làm sạch môi trường.',
      },
      {
        id: 'dioxin-05',
        code: 'DC-05',
        fileOrigin: 'dataset/Scene image/IMG_2795.png',
        title: 'Tủ sách & công trình nghiên cứu quốc tế về Chất độc Da cam / Dioxin',
        src: 'images/dashboard/dioxin-05.webp',
        width: 1200,
        height: 900,
        caption: 'Tủ trưng bày các ấn phẩm Việt Nam, Mỹ, Nhật Bản về thảm họa Dioxin, nổi bật với cuốn sách về hai anh em Việt – Đức và “Agent Orange in the Vietnam War”.',
        detail: 'Nguồn tư liệu khoa học và nhân đạo đối chiếu hậu quả lâu dài của vũ khí hóa học.',
      },
    ],
  },
  {
    id: 'prison-regime',
    number: '05',
    shortTitle: 'Chế độ Lao tù & Ý chí',
    title: 'Chế độ Lao tù & Tinh thần Bất khuất của Chiến sĩ Cách mạng',
    subtitle: 'Từ Khám Chí Hòa, Trại giam Phú Quốc, Nhà lao thiếu nhi Đà Lạt đến khu phục dựng Chuồng Cọp Côn Đảo',
    location: 'Khu vực chuyên đề Chế độ lao tù trong chiến tranh xâm lược',
    summary:
      'Khu trưng bày tái hiện hệ thống nhà tù, trại giam khắc nghiệt như Côn Đảo, Phú Quốc, Chí Hòa, Tân Hiệp và Nhà lao thiếu nhi Đà Lạt. Bên cạnh những hiện vật tố cáo tội ác tra tấn như “Chuồng Cọp”, máy chém và phòng biệt giam, không gian này còn sáng ngời ý chí kiên trung, niềm lạc quan cách mạng của những người chiến sĩ cộng sản và đồng bào yêu nước.',
    historicalContext:
      'Ngay trong ngục tù tăm tối, những vần thơ “Thân thể ở trong lao / Tinh thần ở ngoài lao” của Chủ tịch Hồ Chí Minh vẫn được các chiến sĩ khắc lên tường đá làm điểm tựa tinh thần; những chiếc khăn tay thêu hoa gửi người thân hay tư thế hiên ngang của liệt sĩ Nguyễn Văn Trỗi trước pháp trường đã trở thành biểu tượng bất diệt của chủ nghĩa anh hùng cách mạng.',
    groupReflection:
      'Khi bước qua lối đi hẹp bằng đá của khu phục dựng Chuồng Cọp Côn Đảo và nhìn thấy chiếc khăn thêu tay tỉ mỉ của người tù chính trị, các thành viên trong nhóm thực sự khâm phục nghị lực phi thường của thế hệ đi trước.',
    keyFacts: [
      'Sơ đồ tổ chức và hồ sơ tư liệu về Khám Chí Hòa, Trại giam tù binh Phú Quốc và Nhà lao thiếu nhi Đà Lạt',
      'Khu phục dựng nguyên mẫu “Chuồng Cọp” (Tiger Cages) Côn Đảo, chuồng cọp kẽm gai và chiếc máy chém lịch sử',
      'Kỷ vật khăn thêu tay trong tù và hình ảnh liệt sĩ Nguyễn Văn Trỗi tại Khám Chí Hòa ngày 15/10/1964',
    ],
    photos: [
      {
        id: 'prison-01',
        code: 'LT-01',
        fileOrigin: 'dataset/Scene image/IMG_2828.png',
        title: 'Khảo sát hồ sơ & sơ đồ tổ chức Khám Chí Hòa',
        src: 'images/dashboard/prison-01.webp',
        width: 1200,
        height: 900,
        caption: 'Thành viên nhóm giới thiệu sơ đồ tổ chức Trung tâm Cải huấn Sài Gòn (Khám Chí Hòa) cùng tủ trưng bày văn bản gốc.',
        detail: 'Khám Chí Hòa có thiết kế hình bát giác đặc trưng, nơi từng giam giữ hàng vạn chiến sĩ cách mạng và người yêu nước.',
      },
      {
        id: 'prison-02',
        code: 'LT-02',
        fileOrigin: 'dataset/Scene image/IMG_2834.png',
        title: 'Cổng vào khu phục dựng “Chuồng Cọp” (Tiger Cages) — Nhà tù Côn Đảo',
        src: 'images/dashboard/prison-02.webp',
        width: 900,
        height: 1200,
        caption: 'Lối vào bằng tường đá dẫn tới khu mô phỏng “Chuồng Cọp” — kiểu giam giữ đặc biệt khắc nghiệt tại Nhà tù Côn Đảo.',
        detail: 'Không gian tái hiện chân thực kiến trúc đá ngột ngạt và hệ thống song sắt phía trên đầu phạm nhân.',
      },
      {
        id: 'prison-03',
        code: 'LT-03',
        fileOrigin: 'dataset/Scene image/IMG_2835.png',
        title: 'Phòng giam biệt lập & những vần thơ Nhật ký trong tù trên vách đá',
        src: 'images/dashboard/prison-03.webp',
        width: 900,
        height: 1200,
        caption: 'Mô hình người tù chính trị bị cùm chân trong xà lim đá, phía trên tường khắc bốn câu thơ chữ Hán “Thân thể ở trong lao / Tinh thần ở ngoài lao…”.',
        detail: 'Khắc họa sự đối lập giữa xiềng xích thể xác và ý chí tự do, bất khuất của người chiến sĩ cách mạng.',
      },
      {
        id: 'prison-04',
        code: 'LT-04',
        fileOrigin: 'dataset/Scene image/IMG_2839.png',
        title: 'Thành viên nhóm bên hiện vật “Chuồng cọp kẽm gai” phục chế',
        src: 'images/dashboard/prison-04.webp',
        width: 900,
        height: 1200,
        caption: 'Thành viên nhóm đứng cạnh lồng kẽm gai chật hẹp — kiểu giam giữ ngoài trời dùng để phơi nắng, phơi sương tù binh tại Phú Quốc.',
        detail: 'Bảng thuyết minh phía trên giải thích kích thước chật hẹp khiến người bị giam không thể đứng thẳng hay nằm duỗi người.',
      },
      {
        id: 'prison-05',
        code: 'LT-05',
        fileOrigin: 'dataset/Scene image/IMG_2832.png',
        title: 'Kỷ vật khăn thêu trong lao tù & hình ảnh anh hùng Nguyễn Văn Trỗi',
        src: 'images/dashboard/prison-05.webp',
        width: 1200,
        height: 900,
        caption: 'Tủ kính lưu giữ những chiếc khăn thêu hoa đầy lạc quan của tù chính trị và bức ảnh anh Nguyễn Văn Trỗi hiên ngang trước giờ xử bắn (15/10/1964).',
        detail: 'Minh chứng xúc động về tình yêu cuộc sống và niềm tin tất thắng của người chiến sĩ ngay nơi ngục tù.',
      },
    ],
  },
  {
    id: 'war-memory-press',
    number: '06',
    shortTitle: 'Kháng chiến & Ống kính Báo chí',
    title: 'Ký ức Kháng chiến & Sự thật qua Ống kính Phóng viên Chiến trường',
    subtitle: 'Tái hiện không gian chiến khu miền Nam và bộ sưu tập ảnh báo chí “Hồi niệm” (Requiem)',
    location: 'Tầng 2 · Không gian thực cảnh kháng chiến & Triển lãm ảnh báo chí chiến trường',
    summary:
      'Khép lại hành trình tham quan là sự đối sánh giữa hai góc nhìn: một bên là không gian tái hiện cuộc sống chiến đấu của quân dân miền Nam trong rừng ngập mặn với vũ khí thô sơ và xuồng ba lá; một bên là triển lãm ảnh báo chí “Hồi niệm” (Requiem) và nghệ thuật sắp đặt “Shadow of the Shutter” vinh danh 134 phóng viên thuộc cả hai phía đã ngã xuống để ghi lại sự thật của cuộc chiến.',
    historicalContext:
      'Những bức ảnh của các phóng viên chiến trường như Larry Burrows (tạp chí LIFE), Horst Faas, Henri Huet hay các phóng viên Thông tấn xã Giải phóng đã đưa sự thật về cuộc chiến tranh Việt Nam đến thẳng lương tri nhân loại, góp phần thúc đẩy phong trào phản chiến trên toàn thế giới.',
    groupReflection:
      'Góc nhìn của các phóng viên ảnh chiến trường nhắc nhở nhóm về giá trị của sự trung thực lịch sử — cũng chính là nguyên tắc mà nhóm áp dụng khi biên soạn 12 thẻ lịch sử và 25 ảnh tư liệu có nguồn gốc rõ ràng trong trò chơi “Hành trình tìm đường cứu nước”.',
    keyFacts: [
      'Mô hình thực cảnh chiến khu rừng ngập mặn, xuồng tiếp tế vũ khí, súng trường CKC và quân trang chiến sĩ',
      'Không gian sắp đặt nghệ thuật “Shadow of the Shutter” với những khung ảnh treo lơ lửng trong tháp ánh sáng',
      'Bộ sưu tập ảnh “Hồi niệm” (Requiem) và trích đoạn phỏng vấn phóng viên ảnh Larry Burrows trên tạp chí LIFE (1965)',
    ],
    photos: [
      {
        id: 'press-01',
        code: 'BC-01',
        fileOrigin: 'dataset/museum introduction/IMG_2760.png',
        title: 'Hai thành viên nhóm tại không gian tái hiện chiến khu rừng ngập mặn',
        src: 'images/dashboard/press-01.webp',
        width: 1400,
        height: 1050,
        caption: 'Hai thành viên nhóm bên chiếc xuồng gỗ chở hòm đạn tiếp tế giữa mô hình rừng đước kháng chiến tại bảo tàng.',
        detail: 'Tái hiện sinh động phương thức vận chuyển vũ khí bí mật qua hệ thống sông rạch chằng chịt của quân và dân miền Nam.',
      },
      {
        id: 'press-02',
        code: 'BC-02',
        fileOrigin: 'dataset/Scene image/IMG_2755.png',
        title: 'Tủ hiện vật súng trường CKC, quân trang & bản đồ vùng kháng chiến',
        src: 'images/dashboard/press-02.webp',
        width: 1200,
        height: 900,
        caption: 'Hai thành viên nhóm giới thiệu tủ kính trưng bày súng trường, bi đông nước, đèn pin góc vuông và bản đồ khu vực Bảy Núi – U Minh.',
        detail: 'Những trang bị giản dị gắn liền với đời sống chiến đấu của lực lượng vũ trang giải phóng.',
      },
      {
        id: 'press-03',
        code: 'BC-03',
        fileOrigin: 'dataset/museum introduction/IMG_2812.png',
        title: 'Không gian nghệ thuật sắp đặt “Shadow of the Shutter”',
        src: 'images/dashboard/press-03.webp',
        width: 900,
        height: 1200,
        caption: 'Thành viên nhóm ghi hình dưới vòng xoáy những bức ảnh tư liệu treo lơ lửng trong không gian “Shadow of the Shutter”.',
        detail: 'Thiết kế thị giác ấn tượng tôn vinh vai trò của nhiếp ảnh báo chí trong việc phơi bày sự thật chiến tranh.',
      },
      {
        id: 'press-04',
        code: 'BC-04',
        fileOrigin: 'dataset/Scene image/IMG_2816.png',
        title: 'Trích đoạn phỏng vấn phóng viên ảnh Larry Burrows & bìa báo LIFE (1965)',
        src: 'images/dashboard/press-04.webp',
        width: 900,
        height: 1200,
        caption: 'Bảng trích lời tâm sự của phóng viên ảnh Larry Burrows về đạo đức nghề nghiệp và nỗi đau chiến tranh cạnh trang bìa tạp chí LIFE ngày 16/4/1965.',
        detail: 'Larry Burrows đã dành 9 năm chụp ảnh chiến tranh tại Đông Dương trước khi hy sinh trên bầu trời Đường 9 – Nam Lào năm 1971.',
      },
      {
        id: 'press-05',
        code: 'BC-05',
        fileOrigin: 'dataset/museum introduction/IMG_2815.png',
        title: 'Góc trưng bày bộ sưu tập ảnh báo chí chiến trường “Hồi niệm” (Requiem)',
        src: 'images/dashboard/press-05.webp',
        width: 900,
        height: 1200,
        caption: 'Những bức ảnh đen trắng và bài đăng báo chí nguyên bản ghi lại khoảnh khắc sinh tử trên chiến trường Việt Nam.',
        detail: 'Bộ ảnh do nhà báo Horst Faas và Tim Page tập hợp nhằm tưởng niệm các phóng viên chiến trường của cả hai phía.',
      },
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
