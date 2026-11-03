"""Compile the user's approved appendix without changing option meanings or scores."""
import json, re, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
raw = (ROOT / 'docs/Prompt_02_Cot_truyen_va_Xay_dung_Web_App.md').read_text(encoding='utf-8')
def clean(s): return s.replace('**', '').strip().strip('“”')
def slug(s):
    s = unicodedata.normalize('NFD', s.lower().replace('đ', 'd'))
    return re.sub(r'[^a-z0-9]+', '-', ''.join(c for c in s if not unicodedata.combining(c))).strip('-')

times = ['Trước tháng 6 · 1911', 'Tháng 6 · 1911', '1912–1917', 'Trước tháng 6 · 1919', 'Tháng 6 · 1919', 'Tháng 7 · 1920', 'Tháng 12 · 1920', 'Năm 1922', '1923–1924', 'Năm 1925', 'Năm 1927', 'Đầu năm · 1930']
places = ['Bến sông Sài Gòn', 'Bến cảng Sài Gòn', 'Khu lao động bên kia biển', 'Căn phòng ở Pháp', 'Bàn đọc tại Pháp', 'Phòng đọc tại Pháp', 'Tin từ Tours · Pháp', 'Bàn biên soạn · Pháp', 'Không gian học tập · Nga Xô viết', 'Nhóm học tập · Quảng Châu', 'Bàn đọc · Quảng Châu', 'Phòng đọc tin · Hồng Kông trên bản đồ']
backgrounds = ['riverside', 'departure', 'workers', 'attic', 'petition', 'july', 'tours', 'press', 'study', 'classroom', 'book', 'reunion']
props = [ ['Quán nước', 'Chiếc túi vải'], ['Con tàu', 'Cuốn sổ bọc vải'], ['Bảng ca làm', 'Bàn ăn tập thể'], ['Ngọn đèn', 'Sách học tiếng'], ['Bản Yêu sách', 'Bản đồ Versailles'], ['Trang báo', 'Các mẩu ghi chú'], ['Bản đồ Tours', 'Bảng đối chiếu niên đại'], ['Bản nháp nội bộ', 'Lọ mực'], ['Bảng so sánh', 'Ghi chú quê hương'], ['Báo Thanh niên', 'Bảng học tập'], ['Đường Kách mệnh', 'Vở bài học'], ['Dòng thời gian', 'Bản đồ Hồng Kông'] ]
items = {
    'I': ['Trang nhật ký đầu tiên','Kế hoạch lên đường','Ghi chép đối chiếu','Chú giải từ khó','Thẻ Yêu sách 1919','Sơ đồ tháng Bảy','Dòng thời gian Tours','Bản nháp bài đọc','Bản liên hệ thực tiễn','Thẻ báo Thanh niên','Bài trình bày','Dòng thời gian 1930'],
    'II': ['Quy ước ghi nguồn','Trang phân lớp thông tin','Ba hồ sơ lời kể','Thẻ từ vựng','Tiêu đề mục 1919','Thẻ thời gian 1920','Hai mốc thành lập Đảng','Bản chú giải lời trích','Bảng so sánh','Trang báo 1925','Trang giới thiệu sách','Trang tổng kết'],
    'III': ['Thỏa thuận với Lâm','Lịch học và lao động','Ghế tại bàn đọc','Bảng câu hỏi chung','Thẻ trả lời lời đồn','Sơ đồ vấn đề thuộc địa','Biểu tượng Tours','Bản tin đọc thử','Bảng phân công','Thẻ công tác đào tạo','Bản tóm tắt đã trao đổi','Dòng thời gian chung']
}
cards=[]
for line in raw.splitlines():
    match=re.match(r'\| (\d+) \| (.*?) \| (.*?) \|', line)
    if not match: continue
    n,fact,refs=match.groups()
    cards.append({'id':f'history-{n}', 'order':int(n), 'time':times[int(n)-1], 'fact':fact, 'sources':[{'title':t,'url':u,'status':'unavailable' if 'mpi.gov.vn' in u else 'verified-2026-11-04'} for t,u in re.findall(r'\[([^]]+)\]\(([^)]+)\)',refs)], 'distinction':'Dữ kiện lịch sử có thật. Cảnh, nhân vật An, hội thoại và nhiệm vụ xung quanh dữ kiện là sáng tác.'})
cards[6]['sources'].append({'title':'Biên niên chính thức: Nguyễn Ái Quốc tại Đại hội Tours tháng 12/1920','url':'https://tulieuvankien.dangcongsan.vn/van-kien-tu-lieu-ve-dang/book/lich-su-dang/lich-su-bien-nien-dang-cong-san-viet-nam-tap-1-18','status':'verified-2026-11-04'})

sections=list(re.finditer(r'^##### ((?:III|II|I)-(\d{2}))\. (.+)$', raw, re.M))
scenes=[]
for m in sections:
    end=re.search(r'^#{4,5} ',raw[m.end():],re.M)
    text=raw[m.end():m.end()+end.start()] if end else raw[m.end():]
    sid,num,title=m.groups(); num=int(num); typ='KT' if num in [5,6,7,10,12] else 'TH'
    context=re.search(r'\*\*(?:Bối cảnh 2D|Dàn cảnh):\*\* (.+)',text)
    lead=re.search(r'\*\*Lời dẫn:\*\* (.+)',text)
    dialogue=re.search(r'\*\*([^*:\n]+):\*\* “(.+)”',text)
    if dialogue and dialogue.group(1)=='Lời dẫn':
        dialogue=re.search(r'\*\*([^*:\n]+):\*\* “(.+)”',text[dialogue.end():])
    speaker,quote=dialogue.groups() if dialogue else ('Mai','Cùng đọc kỹ dữ kiện, rồi chọn cách giải quyết nhiệm vụ này nhé.')
    question=re.search(r'\*\*(?:Tình huống TH|Câu hỏi KT(?: – mốc K(?:6|12))?|Câu hỏi):\*\*\s*([^\n]+)',text)
    question=clean(question.group(1)) if question else {'TH':'An sẽ thực hiện nhiệm vụ này như thế nào?', 'KT':'Nhận định nào phù hợp với dữ kiện lịch sử?'}[typ]
    # A heading without inline question must not consume the first choice.
    if question.startswith('- **') or question.startswith('- A.'): question='Nhận định nào phù hợp với dữ kiện lịch sử?'
    choices=[]
    for letter,option,result,score in re.findall(r'^- \*\*([ABCD])\. (.+?)\*\* (.+?) \*\*([+−-]\d+)\*\*',text,re.M):
        points=int(score.replace('−','-'))
        choices.append({'id':f'{sid}:{slug(option)}','originalLabel':letter,'text':option,'points':points,'correct':points==2 if typ=='KT' else None,'feedback':clean(result), 'itemChange':{'id':sid,'title':props[num-1][1], 'state': ['Cần kiểm tra lại','Chưa hoàn thiện','Đang bổ sung','Đã đối chiếu'][points+1], 'description':clean(result)}, 'milestone':f'K{num}' if num in [6,12] else None})
    assert len(choices)==4,(sid,choices)
    explanation=re.search(r'\*\*Giải thích sau chọn:\*\* (.+)',text)
    scenes.append({'id':sid,'campaignId':sid.split('-')[0], 'order':num,'type':typ,'title':re.sub(r' — (TH|KT).*','',title), 'time':times[num-1], 'place':places[num-1], 'background':backgrounds[num-1], 'characters':['An',speaker], 'context':clean(context.group(1)), 'lead':clean(lead.group(1)) if lead else clean(context.group(1)), 'dialogue':{'speaker':speaker,'text':quote}, 'question':question, 'choices':choices,'nextSceneId':f'{sid.split("-")[0]}-{num+1:02}' if num<12 else None,'historyId':f'history-{num}', 'explanation':cards[num-1]['fact'] if typ=='KT' else 'Đây là hệ quả đối với nhiệm vụ hư cấu của An. Bạn có thể tiếp tục học hỏi ở những chặng tiếp theo.', 'hotspots':[{'id':slug(p),'name':p, 'text':(cards[num-1]['fact'] if j==0 else f'{p} là đạo cụ trong câu chuyện hư cấu. Các ghi chép và lựa chọn được giữ lại trong nhật ký của An.'), 'isHistorical':j==0} for j,p in enumerate(props[num-1])], 'conditions':[]})

byid={s['id']:s for s in scenes}
questions = {
    'I-06':'Văn bản nào gắn với bước chuyển nhận thức của Nguyễn Ái Quốc vào tháng 7/1920?',
    'I-07':'Điều gì diễn ra tại Đại hội Tours liên quan đến Nguyễn Ái Quốc?',
    'II-01':'An nên ghi ba loại lời kể vào nhật ký thế nào?',
    'II-02':'Dữ kiện lịch sử và chuyến đi hư cấu của An nên được trình bày ra sao?',
    'II-03':'An sẽ ghi lại ba lời kể khác nhau ở khu cảng như thế nào?',
    'II-04':'An sẽ làm gì với từ chưa hiểu trong bản dịch?',
    'II-05':'Tiêu đề nào mô tả đúng bản Yêu sách năm 1919?',
    'II-08':'An nên phân biệt lời trích và nhận xét của mình thế nào?',
    'II-09':'An sẽ xử lý cột “điều cần khảo sát” còn trống ra sao?',
    'II-10':'Báo Thanh niên ra số đầu vào ngày nào?',
    'II-11':'An sẽ giới thiệu Đường Kách mệnh với người chưa đọc như thế nào?',
    'III-01':'An sẽ trao đổi với Lâm về mưu sinh và việc học ra sao?',
    'III-02':'An và Lâm nên chia việc và giữ lời hẹn thế nào?',
    'III-03':'An sẽ giúp người bạn mới tham gia bàn đọc bằng cách nào?',
    'III-04':'Làm thế nào để buổi đọc có sự tham gia của cả nhóm?',
    'III-06':'Nội dung nào của Luận cương gắn với câu hỏi Nguyễn Ái Quốc đang theo đuổi?',
    'III-08':'An nên làm gì khi người đọc chưa hiểu bản thông tin nội bộ?',
    'III-09':'Nhóm sẽ phân công thế nào để vẫn làm việc khi An vắng mặt?',
    'III-10':'Công tác huấn luyện, truyền bá kiến thức của Hội có ý nghĩa gì?',
    'III-11':'Nhóm nên giải quyết hai cách hiểu khác nhau bằng cách nào?',
    'III-12':'Ý nghĩa nào của sự thành lập Đảng cần được ghi vào tổng kết?'
}
for scene in scenes:
    scene['question'] = questions.get(scene['id'], scene['question'])
    for c in scene['choices']:
        if scene['type']=='KT' and c['feedback'] in ['Đúng.','Sai.']:
            c['feedback'] = (f'Thẻ được đặt đúng: {c["text"]}' if c['correct'] else f'Phương án “{c["text"]}” chưa phù hợp với mốc này. Hãy đối chiếu thời gian và sự kiện trong phần giải thích.')
            c['itemChange']['description'] = c['feedback']
        c['itemChange']['title'] = items[scene['campaignId']][scene['order']-1]
        c['itemChange']['state'] = ('Đã xác nhận' if c['correct'] else 'Cần ôn lại') if scene['type']=='KT' else ['Cần xem lại','Đang bỏ ngỏ','Cần bổ sung','Đã hoàn thành'][c['points']+1]
    for j,h in enumerate(scene['hotspots']):
        h['isHistorical'] = j==0 and scene['order'] in [2,5,6,7,10,11,12]
        if not h['isHistorical']:
            h['text'] = f'{h["name"]} là một chi tiết trong cảnh hư cấu tại {scene["place"]}. '+('Bác Tư lắng nghe những người lao động ở đây trước khi An bắt đầu trang nhật ký.' if scene['order']==1 and j==0 else 'Hãy quan sát, đọc hội thoại và mở nhật ký để xem dấu vết nhiệm vụ của An. Chi tiết này không tự cộng điểm.')
def condition(target,source,label,yes,no):
    byid[target]['conditions'].append({'sceneId':source,'choiceId':next(c['id'] for c in byid[source]['choices'] if c['originalLabel']==label),'matched':yes,'otherwise':no})
condition('I-04','I-03','D','Mai đặt trang ghi chép đối chiếu của An cạnh sách học tiếng: “Ta thử đọc từ chính những điều cậu đã quan sát.”','Mai đưa bản chú giải và nhắc An lắng nghe nhiều góc nhìn trước khi kết luận.')
condition('I-08','I-03','D','Hai trang sổ cũ từ khu cảng trở thành tài liệu đối chiếu cho bản nháp hôm nay.','Mai đưa tư liệu tham khảo thay cho bản quan sát còn thiếu. Ghi chép cũ vẫn ở nguyên trong nhật ký.')
condition('I-07','I-06','B','Sơ đồ ghi chú đúng từ tháng Bảy đã nằm trên bàn, sẵn sàng nối với mốc Tours.','Bình mang bảng đối chiếu niên đại để cùng sửa nhầm lẫn ở trang báo tháng Bảy.')
condition('I-11','I-08','C','Mai mang bài đọc có nguồn vào buổi học để An dùng làm ví dụ.','Mai nhắc kiểm tra từng ví dụ với nguồn, đặc biệt những chi tiết chưa xảy ra trong bản nháp cũ.')
condition('II-03','II-01','C','Biểu tượng nguồn từ trang đầu được dùng lại: người kể, thời điểm, điều tận mắt thấy.','Trang đầu còn thiếu quy ước nguồn; Mai đưa mẫu tham khảo để An dùng khi đối chiếu ba lời kể.')
condition('II-08','II-04','C','Mai chỉ vào từ từng dịch bằng phỏng đoán: “Ta cần kiểm lại bản dịch cũ trước khi trích.”','An mở lại thẻ từ khó; phần dịch đã kiểm tra và phần chờ đối chiếu được ghi riêng.')
condition('II-11','II-08','D','Mai nhắc An sửa lời đã gán sai tác giả trong bản đọc trước rồi mới hoàn thiện trang giới thiệu.','Cách tách lời trích và nhận xét được dùng lại khi ghi đúng tác giả của cuốn sách.')
condition('III-02','III-01','D','Lâm chỉ nhận một việc nhỏ để thử lại sự tin cậy sau cuộc trò chuyện ở quán nước.','Lâm sẵn sàng trao đổi công việc; tờ hẹn ở quán nước nằm cạnh lịch sinh hoạt mới.')
condition('III-06','III-04','C','Bình nối vấn đề thuộc địa với câu hỏi cũ mà cả nhóm từng viết lên bảng.','Mai tóm tắt lại câu hỏi về dân tộc và thuộc địa để mọi người cùng theo dõi.')
condition('III-08','III-03','A','Người bạn từng được hỗ trợ ngôn ngữ nhận lời đọc thử bản tin và góp một góc nhìn mới.','Mai làm người đọc thử; chiếc ghế của người bạn ở khu cảng vẫn nhắc nhóm về điều chưa kết nối được.')
condition('III-11','III-09','A','Một thành viên khác chủ trì phần kiểm tra theo lịch luân phiên. An cùng lắng nghe.','Bình đề nghị phân công lại để việc đối chiếu không còn phụ thuộc một mình An.')

names=['Người lên đường','Người ghi chép','Người kết nối']
goals=['Tìm hiểu, lao động, học hỏi và xác định một hướng đi có cơ sở.','Xây dựng cuốn nhật ký có nguồn, phân biệt lời kể và dữ kiện đã kiểm chứng.','Duy trì nhóm học tập bằng lắng nghe, phân công và giải quyết bất đồng.']
campaigns=[{'id':cid,'name':names[i],'description':goals[i],'objective':goals[i],'opening':('Sài Gòn, năm 1911. Chiếc túi đã sẵn sàng, nhưng An vẫn mang theo một câu hỏi: phải hiểu những gì để giúp quê hương?' if i==0 else 'Sài Gòn, năm 1911. An bắt đầu một nhiệm vụ mới: '+goals[i][0].lower()+goals[i][1:]),'sceneIds':[s['id'] for s in scenes if s['campaignId']==cid],'unlockAfter':None if i==0 else ['I','II'][i-1]} for i,cid in enumerate(['I','II','III'])]
endings=[]
for m in re.finditer(r'^\*\*((?:III|II|I))-(GOOD|NEUTRAL|BAD) – (.+)\*\*$',raw,re.M):
    end=re.search(r'^\*\*(?:(?:III|II|I)-|Chuyển lượt|Sau ending)|^#### ',raw[m.end():],re.M)
    text=raw[m.end():m.end()+end.start()] if end else raw[m.end():]
    image=re.search(r'Hình ảnh: (.+)',text).group(1)
    closing=re.search(r'Lời kết: “(.+)”',text).group(1)
    cid,typ,title=m.groups()
    endings.append({'id':f'{cid}-{typ.lower()}','campaignId':cid,'type':typ.lower(),'title':title,'text':closing,'illustration':image,'momentsRule':'Ưu tiên các lựa chọn làm nhiệm vụ thiếu sót, rồi các lựa chọn có hệ quả xuyên màn; chọn ba màn khác nhau, giữ thứ tự thời gian.','nextCampaignId':{'I':'II','II':'III','III':None}[cid]})
assert len(scenes)==36 and len(cards)==12 and len(endings)==9
data={'version':1,'campaigns':campaigns,'scenes':scenes,'historyCards':cards,'endings':endings}
(ROOT/'src/content').mkdir(parents=True,exist_ok=True)
(ROOT/'src/content/story.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(ROOT/'docs/Cot_truyen_bien_tap.md').write_text('# Cốt truyện dùng trong ứng dụng\n\nSinh từ phụ lục đã cung cấp. Nội dung hiển thị và điều kiện xuyên màn được lưu tại `src/content/story.json`; không nằm trong component.\n\n'+'\n\n'.join(f'## {s["id"]}. {s["title"]}\n\n{s["time"]} · {s["place"]}\n\n{s["lead"]}\n\n{s["dialogue"]["speaker"]}: “{s["dialogue"]["text"]}”\n\n{s["question"]}\n\n'+'\n'.join(f'- {c["originalLabel"]}. {c["text"]}\n  Hệ quả: {c["feedback"]}' for c in s['choices'])+'\n\n'+'\n'.join(f'Kế thừa {c["sceneId"]}: {c["matched"]} Nếu khác: {c["otherwise"]}' for c in s['conditions']) for s in scenes),encoding='utf-8')
print(f'Compiled {len(campaigns)} campaigns, {len(scenes)} scenes, {sum(len(s["choices"]) for s in scenes)} choices, {len(endings)} endings.')
source_doc = '# Danh mục nguồn lịch sử\n\nĐối chiếu ngày 04/11/2026 qua các trang chính thức. Dữ kiện nền là nội dung do người dùng cung cấp, được giữ nguyên; không gán lời thoại hư cấu cho nhân vật lịch sử.\n\n'
for card in cards:
    source_doc += f'## Mốc {card["order"]} · {card["time"]}\n\n{card["fact"]}\n\n'
    for source in card['sources']:
        status='Không truy cập được (timeout); dùng nguồn biên niên bổ sung.' if source['status']=='unavailable' else 'Đã mở và đối chiếu.'
        source_doc += f'- [{source["title"]}]({source["url"]}) — {status}\n'
    source_doc += '\n'
(ROOT/'docs/Nguon_lich_su.md').write_text(source_doc,encoding='utf-8')
