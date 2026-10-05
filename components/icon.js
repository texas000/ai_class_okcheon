// 별도 아이콘 라이브러리 없이 SVG로 그린 작은 그림입니다.
export default function Icon({ name, size = 20, ...props }) {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: (
      <>
        <path d="M12 19V5m-6 6 6-6 6 6" />
      </>
    ),
    chevron: <path d="m9 5 7 7-7 7" />,
    chat: (
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9H13a8.5 8.5 0 0 1 8 8z" />
    ),
    code: (
      <>
        <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 18h6m-5 3h4M8.5 14.5a6 6 0 1 1 7 0L15 16H9z" />
      </>
    ),
    pen: (
      <>
        <path d="m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15z" />
      </>
    ),
    book: (
      <>
        <path d="M12 5v16M3 3h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3z" />
      </>
    ),
    external: (
      <>
        <path d="M15 3h6v6m0-6-9 9M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6zM20 2v4m-2-2h4" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
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
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.sparkles}
    </svg>
  );
}
