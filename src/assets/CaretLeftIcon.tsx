import type { SVGProps } from "react";

const SvgCaretLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="8"
    height="15"
    viewBox="0 0 8 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      id="Caret Left"
      d="M6.25 13.5222L1 7.49194L6.25 1.46304"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgCaretLeft;
