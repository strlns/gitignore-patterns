import iconClassNames from "styles/Icon.module.css";

export default function PlusIcon({
  title,
  ...attributes
}: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={iconClassNames.icon}
      aria-label={title}
      {...attributes}
    >
      <title>{title}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}
