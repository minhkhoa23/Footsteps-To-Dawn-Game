export type IconName = "arrow" | "book" | "check" | "chevron" | "close" | "compass" | "gear" | "headphones" | "info" | "lock" | "map" | "pause" | "play" | "spark" | "volume"

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 016.5 3H11v16H6.5A2.5 2.5 0 004 21zM20 5.5A2.5 2.5 0 0017.5 3H13v16h4.5A2.5 2.5 0 0120 21z" />
      </>
    ),
    check: <path d="M5 12.5l4.2 4L19 7" />,
    chevron: <path d="M9 6l6 6-6 6" />,
    close: (
      <>
        <path d="M6 6l12 12M18 6L6 18" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5-5 2 2-5z" />
      </>
    ),
    gear: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path
          d="M19 13.5v-3l-2.1-.5a7 7 0 00-.8-1.9l1.1-1.8-2.1-2.1-1.8 1.1a7 7 0 00-1.9-.8L10.5 2h-3L7 4.5a7 7 0 00-1.9.8L3.3 4.2 1.2 6.3l1.1 1.8a7 7 0 00-.8 1.9L0 10.5v3l2.3.5a7 7 0 00.8 1.9L2 17.7l2.1 2.1 1.8-1.1a7 7 0 001.9.8l.5 2.5h3l.5-2.5a7 7 0 001.9-.8l1.8 1.1 2.1-2.1-1.1-1.8a7 7 0 00.8-1.9z"
          transform="translate(2.5)"
        />
      </>
    ),
    headphones: (
      <>
        <path d="M4 14v-2a8 8 0 0116 0v2" />
        <path d="M4 14h3v6H5a1 1 0 01-1-1zM20 14h-3v6h2a1 1 0 001-1z" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6M12 7h.01" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
      </>
    ),
    map: (
      <>
        <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15" />
      </>
    ),
    pause: (
      <>
        <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
      </>
    ),
    play: <path d="M8 5l11 7-11 7z" />,
    spark: (
      <>
        <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" />
        <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z" />
      </>
    ),
    volume: (
      <>
        <path d="M4 10v4h4l5 4V6L8 10z" />
        <path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  )
}


