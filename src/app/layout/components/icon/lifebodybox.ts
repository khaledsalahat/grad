import { Component, Input } from "@angular/core";

@Component({
  selector: "LifeBodyBoxIcon",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      [class]="className"
    >
      <path
        d="M7.09521 9.45209C4.74409 12.3252 3.3335 15.9978 3.3335 19.9999C3.3335 24.0021 4.74413 27.6748 7.09532 30.5479L13.6503 23.9929C12.9217 22.8367 12.5002 21.4675 12.5002 19.9999C12.5002 18.5324 12.9217 17.1633 13.6502 16.0071L7.09521 9.45209Z"
        fill="url(#paint0_linear_4262_7376)"
      />
      <path
        d="M9.45222 7.09506L16.0072 13.65C17.1634 12.9214 18.5326 12.4999 20.0002 12.4999C21.4678 12.4999 22.8369 12.9215 23.9932 13.6501L30.5481 7.09508C27.675 4.74389 24.0023 3.33325 20.0002 3.33325C15.998 3.33325 12.3253 4.74388 9.45222 7.09506Z"
        fill="url(#paint1_linear_4262_7376)"
      />
      <path
        d="M32.9051 9.45212L26.3501 16.0071C27.0787 17.1633 27.5002 18.5324 27.5002 19.9999C27.5002 21.4675 27.0786 22.8367 26.35 23.9929L32.905 30.5479C35.2562 27.6747 36.6668 24.0021 36.6668 19.9999C36.6668 15.9978 35.2562 12.3252 32.9051 9.45212Z"
        fill="url(#paint2_linear_4262_7376)"
      />
      <path
        d="M30.548 32.9049L23.993 26.3499C22.8368 27.0784 21.4677 27.4999 20.0002 27.4999C18.5326 27.4999 17.1635 27.0784 16.0074 26.3499L9.45236 32.9049C12.3255 35.256 15.9981 36.6666 20.0002 36.6666C24.0023 36.6666 27.6749 35.256 30.548 32.9049Z"
        fill="url(#paint3_linear_4262_7376)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4262_7376"
          x1="20.6538"
          y1="4.97467"
          x2="20.6538"
          y2="33.1312"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4262_7376"
          x1="20.6538"
          y1="4.97467"
          x2="20.6538"
          y2="33.1312"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4262_7376"
          x1="20.6538"
          y1="4.97467"
          x2="20.6538"
          y2="33.1312"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_4262_7376"
          x1="20.6538"
          y1="4.97467"
          x2="20.6538"
          y2="33.1312"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class LifeBodyBoxIcon {
  @Input() className: any = "";
}
