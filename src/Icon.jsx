const paths = {
  skull: (
    <>
      <path d="M12 3C7.6 3 4 6.1 4 10.2c0 2.3 1.1 4.1 3 5.3V19h10v-3.5c1.9-1.2 3-3 3-5.3C20 6.1 16.4 3 12 3z" />
      <circle cx="8.6" cy="10.5" r="1.7" />
      <circle cx="15.4" cy="10.5" r="1.7" />
      <path d="M12 13l-1 2h2z M10 19v-2 M12 19v-2 M14 19v-2" />
    </>
  ),
  empanada: (
    <>
      <path d="M3 17a9 9 0 0 1 18 0z" />
      <path d="M6 14l1.2.7 M9.5 11.5l.9 1.1 M14.5 11.5l-.9 1.1 M18 14l-1.2.7" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="11" width="16" height="9" rx="1" />
      <rect x="3" y="8" width="18" height="3" rx="1" />
      <path d="M12 8v12 M12 8C10 3.5 6 4.5 7.5 8 M12 8c2-4.5 6-3.5 4.5 0" />
    </>
  ),
  cards: (
    <>
      <rect x="4.5" y="6" width="10" height="14" rx="1.5" transform="rotate(-10 9.5 13)" />
      <rect x="9.5" y="4" width="10" height="14" rx="1.5" transform="rotate(8 14.5 11)" />
      <path d="M13.5 8.5l1 2 2 .3-1.5 1.4.4 2-1.9-1-1.8 1 .4-2-1.5-1.4 2-.3z" />
    </>
  ),
  chest: (
    <>
      <path d="M4 11c0-3 3.6-5 8-5s8 2 8 5" />
      <rect x="4" y="11" width="16" height="9" rx="1" />
      <path d="M12 13.5v3 M4 14h16" />
    </>
  ),
  burger: (
    <>
      <path d="M4 10.5a8 6 0 0 1 16 0z" />
      <path d="M4 13.5c2 2 3-2 5 0s3-2 5 0 3-2 6 0" />
      <path d="M4 16.5h16" />
      <path d="M5 19h14v.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5z" />
    </>
  ),
  hotdog: (
    <g transform="rotate(-35 12 12)">
      <rect x="1.5" y="8" width="21" height="8" rx="4" />
      <path d="M4 12c2-2 3 2 5 0s3 2 5 0 3 2 5 0" />
    </g>
  ),
  gem: (
    <>
      <path d="M6 4h12l4 5-10 12L2 9z" />
      <path d="M2 9h20 M9 4l-2 5 5 12 5-12-2-5" />
    </>
  ),
  icecream: (
    <>
      <path d="M7.5 11a4.5 4.5 0 1 1 9 0z" />
      <path d="M8 11l4 11 4-11 M9.8 14.5h4.4" />
    </>
  ),
  lemonade: (
    <>
      <path d="M6 7h12l-1.5 13h-9z M7 11h10" />
      <path d="M13 7l3-5" />
      <circle cx="6.5" cy="6.5" r="2.5" />
    </>
  ),
  soda: (
    <>
      <circle cx="9" cy="15" r="4.5" />
      <circle cx="16.5" cy="9" r="3" />
      <circle cx="7" cy="6" r="1.5" />
      <circle cx="17" cy="18" r="1.4" />
    </>
  ),
  ice: <path d="M12 2.5v19 M3.8 7.2l16.4 9.6 M3.8 16.8l16.4-9.6 M9.5 4.5L12 7l2.5-2.5 M9.5 19.5L12 17l2.5 2.5" />,
  shake: (
    <>
      <path d="M7 10h10l-1.5 11h-7z" />
      <path d="M7 10c0-3 2-4.5 5-4.5s5 1.5 5 4.5" />
      <path d="M13 5.5l2-3.5" />
    </>
  ),
}

export default function Icon({ name, size = 28, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
