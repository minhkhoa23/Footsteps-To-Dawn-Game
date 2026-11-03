import { useId } from 'react';

export function HarborScene({ night = false, environment = 'harbor' }: { night?: boolean; environment?: 'harbor'|'riverside'|'workers' }) {
  const uid=useId().replaceAll(':','');
  return (
    <svg
      className="harbor-art"
      viewBox="0 0 920 660"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={environment==='workers' ? 'Minh họa hư cấu khu lao động bên cảng, giai đoạn 1912–1917' : 'Minh họa An đứng trước bến cảng Sài Gòn đầu thế kỷ hai mươi'}
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={night ? "#223946" : "#b9d0c5"} />
          <stop offset="1" stopColor={night ? "#a16f53" : "#ead09d"} />
        </linearGradient>
        <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#567c7e" />
          <stop offset="1" stopColor="#183d47" />
        </linearGradient>
        <filter id={`${uid}-rough`}>
          <feTurbulence baseFrequency=".8" numOctaves="2" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="soft-light" />
        </filter>
      </defs>
      <rect width="920" height="660" fill={`url(#${uid}-sky)`} />
      <circle cx="690" cy="115" r="52" fill="#f6d994" opacity=".74" />
      <path
        d="M0 260Q130 230 270 252T540 244T920 222V395H0Z"
        fill="#8ea597"
        opacity=".46"
      />
      <g fill="#364b49" opacity=".9">
        <path d="M0 302h103v-61h70v61h88v-88h84v88h62v-45h92v45h100v-67h81v67h90v-42h150v145H0z" />
        <path
          d="M64 241v-43h10v43m50 0v-62h9v62m158-27v-53h9v53m25 0v-70h8v70m311 21v-76h9v76"
          stroke="#253936"
          strokeWidth="7"
        />
      </g>
      <path d="M0 365Q190 342 390 374T920 344V660H0Z" fill={`url(#${uid}-water)`} />
      <g stroke="#a9c0ad" opacity=".42" fill="none">
        <path d="M12 429q140-22 277 3t264-2 355-6M22 500q128 18 241-2t270 6 374-8M0 576q136-18 265 1t247-2 407 1" />
      </g>
      <g className="ship">
        <path
          d="M464 316h342l-35 98H500z"
          fill="#222e2f"
          stroke="#17272b"
          strokeWidth="4"
        />
        <path
          d="M534 268h183v50H534z"
          fill="#e6d6af"
          stroke="#253536"
          strokeWidth="4"
        />
        <path d="M562 236h120v32H562z" fill="#8c352e" />
        <path
          d="M618 235V111M551 268v-80M688 268v-108"
          stroke="#233539"
          strokeWidth="5"
        />
        <path
          d="M622 114q100 2 137 48H622z"
          fill="#ede3c7"
          stroke="#28393a"
          strokeWidth="3"
        />
        <path
          d="M554 190l65-62v62z"
          fill="#afc4b9"
          stroke="#28393a"
          strokeWidth="3"
        />
        <path
          d="M736 236h36v-96h-36z"
          fill="#8b332b"
          stroke="#303b38"
          strokeWidth="3"
        />
        <path
          className="smoke s1"
          d="M753 128c-13-20 13-27 3-49s18-29 8-51"
          stroke="#596968"
          strokeWidth="24"
          opacity=".35"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M0 552h480l108 108H0z"
        fill="#9a7651"
        stroke="#513e32"
        strokeWidth="5"
      />
      <path
        d="M0 574h505M92 552v108M230 552v108M370 552v108"
        stroke="#6d5038"
        strokeWidth="3"
        opacity=".7"
      />
      {environment==='riverside' && <g stroke="#493d2e" strokeWidth="3"><path d="M145 477h130v20H145z" fill="#b28d5b"/><path d="m158 498-8 70m112-70 12 70" fill="none" strokeWidth="8"/><path d="M178 468v-23h28v23z" fill="#d6c7a0"/><path d="M206 450q25-8 10 12m-29-18v-8" fill="none"/><path d="M238 458v10h-15v-10z" fill="#d6c7a0"/><path d="M122 575h173" strokeWidth="8"/></g>}
      {environment==='workers' && <g transform="translate(490 390)" stroke="#2b3f38" strokeWidth="3"><path d="M0 0h165v111H0z" fill="#cdbb8e"/><path d="M16 42h132m-132 26h132m-132 25h132M66 30v69" fill="none"/><text x="15" y="26" fill="#263e3a" stroke="none" fontSize="15" fontFamily="serif">HORAIRES · TRAVAIL</text><path d="m12 112-8 46m149-46 10 46" strokeWidth="7"/></g>}
      <g className="an">
        <ellipse
          cx="356"
          cy="620"
          rx="70"
          ry="14"
          fill="#17313a"
          opacity=".4"
        />
        <path
          d="M330 431q28-24 57 0l-2 99h-63z"
          fill="#e3d8bb"
          stroke="#263337"
          strokeWidth="4"
        />
        <path
          d="M322 466l-35 82M385 466l30 78"
          stroke="#a77956"
          strokeWidth="18"
        />
        <path
          d="M332 526l-19 94M377 526l21 94"
          stroke="#263d44"
          strokeWidth="22"
        />
        <path
          d="M305 620h35M387 620h36"
          stroke="#1d292c"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <ellipse
          cx="357"
          cy="397"
          rx="29"
          ry="35"
          fill="#b9825f"
          stroke="#263337"
          strokeWidth="4"
        />
        <path
          d="M330 394q2-39 31-37 28 3 27 34-14-6-27-22-10 17-31 25z"
          fill="#1f2d31"
        />
        <path d="M339 430q18 15 36 0l19 52q-38 21-76 0z" fill="#e7dbc0" />
        <path
          d="M305 499q-26 25-9 72h49v-68z"
          fill="#806249"
          stroke="#3d322c"
          strokeWidth="4"
        />
        <path d="M316 503v67" stroke="#b9966d" strokeWidth="3" />
        <path d="M384 447q13 6 20 16" stroke="#8d322a" strokeWidth="5" />
      </g>
      <g transform="translate(116 476)" opacity={environment==='harbor' ? 1 : 0}>
        <path
          d="M0 28l86-18 58 34-79 26z"
          fill="#9f744c"
          stroke="#49382e"
          strokeWidth="4"
        />
        <path d="M86 10v48M28 23l60 35" stroke="#6c4e37" strokeWidth="3" />
      </g>
      <g opacity=".45" filter={`url(#${uid}-rough)`}>
        <rect width="920" height="660" fill="#bd9b65" opacity=".09" />
      </g>
    </svg>
  )
}


