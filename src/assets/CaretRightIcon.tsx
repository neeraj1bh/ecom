import type { SVGProps } from "react";

const SvgCaretRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="8"
    height="15"
    viewBox="0 0 8 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      id="Caret Right"
      d="M2.25 1.46307L7.5 7.49329L2.25 13.5222"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgCaretRight;
