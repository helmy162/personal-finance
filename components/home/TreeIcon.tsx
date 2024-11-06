export default function TreeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M100 20V180"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M60 60H140"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M40 100H160"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M20 140H180"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="100" cy="20" r="8" fill="currentColor" />
      <circle cx="60" cy="60" r="8" fill="currentColor" />
      <circle cx="140" cy="60" r="8" fill="currentColor" />
      <circle cx="40" cy="100" r="8" fill="currentColor" />
      <circle cx="100" cy="100" r="8" fill="currentColor" />
      <circle cx="160" cy="100" r="8" fill="currentColor" />
      <circle cx="20" cy="140" r="8" fill="currentColor" />
      <circle cx="70" cy="140" r="8" fill="currentColor" />
      <circle cx="130" cy="140" r="8" fill="currentColor" />
      <circle cx="180" cy="140" r="8" fill="currentColor" />
      <circle cx="100" cy="180" r="8" fill="currentColor" />
      <path
        d="M70 140C70 120 100 120 100 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M130 140C130 120 100 120 100 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 100C40 80 60 80 60 60"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M160 100C160 80 140 80 140 60"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
