import { useId } from 'react';
import { HarborScene } from './HarborScene';
import type { Scene } from '../content';
import { ArchiveScene } from './HistoricalMedia';

export function Portrait({ name }: { name: string }) {
  const older = name === 'Bác Tư'; const mai = name === 'Mai';
  return <svg viewBox="0 0 80 80" role="img" aria-label={`Chân dung minh họa ${name}`}>
    <circle cx="40" cy="40" r="40" fill="#d5bd91" />
    <path d="M9 80q2-26 31-27 29 1 31 27" fill={mai ? '#8d322a' : '#243f45'} />
    <path d="M33 49v11l7 8 8-8V49" fill="#c0956e" />
    <ellipse cx="40" cy="33" rx="17" ry="22" fill="#d8af81" />
    <path d={mai ? 'M22 41Q11 6 41 8q29 2 17 42l-7-24Q36 27 28 18z' : 'M23 31Q18 8 39 8q25-1 19 27l-7-15q-15 7-23 0z'} fill={older ? '#aaa28c' : '#293333'} />
    <path d="M29 34h5m12 0h5m-11 1-2 9h5m-9 5q6 4 12 0" fill="none" stroke="#5e4839" strokeWidth="1.5" />
    {older && <path d="M28 48q12 23 25 0-13 6-25 0" fill="#c9c7b4" />}
    {!mai && <path d="m23 63 12-5 5 10 7-10 11 5" stroke="#b7a17d" fill="none" />}
  </svg>;
}

export function SceneArt({ scene, ending = false, variant = 'good', illustrated = false }: { scene: Scene; ending?: boolean; variant?: string; illustrated?: boolean }) {
  const uid = useId().replaceAll(':','');
  if (!ending && !illustrated) return <ArchiveScene key={scene.id} order={scene.order} />;
  if (scene.order <= 3 && !ending) return <div className={`art-variant variant-${scene.background}`}><HarborScene night={scene.order === 3} environment={scene.order===1 ? 'riverside' : scene.order===3 ? 'workers' : 'harbor'} />{scene.order === 3 && <div className="art-note">QUARTIER DES OUVRIERS<br /><small>Scène imaginaire · 1912–1917</small></div>}</div>;
  const night = ['attic','july','book'].includes(scene.background) || ending && variant !== 'good';
  const press = scene.background === 'press'; const research = scene.background === 'study';
  const classroom = ['classroom','book','reunion'].includes(scene.background) || ending;
  const paperTitle = ({petition:'1919 · YÊU SÁCH',july:'JUILLET 1920',tours:'TOURS · 1920',press:'BẢN ĐỌC NỘI BỘ',study:'GHI CHÚ · 1923',classroom:'THANH NIÊN',book:'ĐƯỜNG KÁCH MỆNH',reunion:'1930 · CHẶNG ĐƯỜNG MỚI'} as Record<string,string>)[scene.background] || 'CAHIER DE LECTURE';
  return <svg className="harbor-art room-art" viewBox="0 0 920 660" role="img" aria-label={ending ? `Minh họa kết thúc ${variant}: căn phòng và những trang ghi chép của An` : `Minh họa ${scene.title} tại ${scene.place}`}>
    <defs>
      <linearGradient id={`${uid}-wall`} x2="1" y2="1"><stop stopColor={night ? '#283e43' : '#a9b6a0'} /><stop offset="1" stopColor={night ? '#554c3d' : '#dbc298'} /></linearGradient>
      <radialGradient id={`${uid}-light`}><stop stopColor="#ffe2a1" stopOpacity=".7" /><stop offset="1" stopColor="#edc578" stopOpacity="0" /></radialGradient>
      <pattern id={`${uid}-grain`} width="12" height="15" patternUnits="userSpaceOnUse"><path d="m0 4 12-2M4 9l4 2M0 14l3-1" stroke="#172d38" strokeOpacity=".08" /></pattern>
    </defs>
    <rect width="920" height="660" fill={`url(#${uid}-wall)`} />
    <path d="M0 0h920v32H0zm0 444h920v216H0z" fill="#413f32" opacity=".6" />
    <g stroke="#263e3f" strokeWidth="8"><path d="M75 80h240v295H75z" fill={night ? '#1a3946' : '#d6dfc5'} /><path d="M195 80v295M75 218h240" /></g>
    <circle cx="261" cy="133" r="26" fill={night ? '#e7d7ab' : '#f6df98'} />
    <path d="M80 318h50v-43h45v43h30v-65h40v65h65v53H80z" fill="#50675b" />
    <path d="M49 58q-20 169 10 329h31V65m237-4q34 165 4 325h-25V65" fill="#683d32" opacity=".85" />
    <path d="M400 90h425v254H400z" fill={classroom ? '#254a47' : '#d9c69c'} stroke="#524932" strokeWidth="10" />
    {classroom ? <g fill="none" stroke="#d2d8b7" strokeWidth="2" opacity=".8"><path d="M442 156h320m-320 70h280m-280 72h260M490 170l60 38m70-38-70 38m0 37v30" /><text x="439" y="133" fill="#f3e6bd" stroke="none" fontSize="21" fontFamily="serif">{ending ? 'CÙNG HỌC · CÙNG KIỂM CHỨNG' : paperTitle}</text></g> : <g fill="none" stroke="#7b8063" strokeWidth="3"><path d={research ? 'M430 170q83-80 169 2t191-30m-310-10 19 111 73 45 75-80 132 83' : 'M433 165l58-30 47 24 40-19 35 45 58-29 39 33 75-19-15 97-100 10-55-31-72 17-46-34z'} /><path d="m508 181 83 47 117-33" strokeDasharray="6 7" stroke="#8d322a" /><circle cx="508" cy="181" r="7" fill="#8d322a" /></g>}
    <g fill="#776c4c" stroke="#3d4235" strokeWidth="3"><path d="M350 382h476l79 278H265z" /><path d="M286 484h597l-28 33H300z" /><path d="m322 511-12 149m502-149 41 149" strokeWidth="12" /></g>
    <ellipse cx="555" cy="377" rx="255" ry="210" fill={`url(#${uid}-light)`} />
    <path d="m425 421 213-21 103 91-256 24z" fill="#ecdeb9" stroke="#918063" strokeWidth="2" />
    <path d="m548 408 45 91m-152-58 100-10m-86 28 91-9m-73 28 91-8m30-44 64-4m-57 18 76-4m-70 18 82-4" stroke="#747660" strokeWidth="2" />
    <text x="460" y="443" transform="rotate(-6 460 443)" fill="#31494a" fontSize="13" fontFamily="serif">{paperTitle}</text>
    {press && <g fill="#273d3c" stroke="#192f34" strokeWidth="4"><path d="M708 414v-46h96v46m-104 0h116v78H700z" /><path d="M721 382h72m-36-29h53m-52 0v24" /><circle cx="817" cy="443" r="33" fill="none" /><path d="M817 410v66m-32-33h66" /></g>}
    <g><path d="M375 433h-60l15-17h30z" fill="#283d3c" /><path d="M331 416v-64h29v64" fill="#ddc98e" stroke="#6d6547" strokeWidth="3" /><path d="M317 354h56l-15-62h-25z" fill="#edcd78" stroke="#7b704e" strokeWidth="3" /><path d="m340 334 3-29 5 29" stroke="#fff1b5" strokeWidth="5" /></g>
    <path d="M745 478h35v-24h-35zm16-24 18-79" fill="#203d40" stroke="#253d3c" strokeWidth="5" />
    <g transform="translate(105 354)"><path d="M-10 234q-19-104 31-132l65 4q43 39 49 130" fill="#243e43" /><path d="m31 88 7 31 26 10 12-27" fill="#bb9873" /><ellipse cx="53" cy="64" rx="33" ry="44" fill="#cba67c" /><path d="M20 69Q-2 2 54 9q45-4 37 67L72 37q-21 13-43 3z" fill="#263635" /><path d="M17 125q52 7 96 47l43-9 9 18-58 17-77-38" fill="#324c49" /><path d="m139 166 36-8 6 16-29 10" fill="#caa67e" /><path d="m33 65 9 1m18-1h9m-22 22q10 5 16 0" fill="none" stroke="#654f3c" strokeWidth="2" /></g>
    {classroom && <g transform="translate(745 370)"><path d="M-25 195q-5-75 34-84l43 5q32 13 38 79" fill={variant==='bad' ? '#515346' : '#873e32'} opacity={ending && variant==='bad' ? '.2' : '1'} /><ellipse cx="28" cy="72" rx="27" ry="37" fill="#c6a17a" opacity={ending && variant==='bad' ? '.2' : '1'} /><path d="M0 77Q-9 20 32 28q35 0 26 59l-17-38L10 56z" fill="#283a35" opacity={ending && variant==='bad' ? '.2' : '1'} /></g>}
    <path d="M30 610h219m-192 17h160m518-59h135" stroke="#171f22" strokeWidth="3" opacity=".3" />
    <rect width="920" height="660" fill={`url(#${uid}-grain)`} />
  </svg>;
}
