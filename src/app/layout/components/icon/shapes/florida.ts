import { Component, Input } from "@angular/core";

@Component({
  selector: "FloridaIcon",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      [class]="className"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.1057 0.320312L6.04837 2.80162L2 5.22917V18.9883L6.04837 21.4696L10.1057 23.7091L22 16.731V12.046V7.36113L10.1057 0.320312ZM10.1057 14.2765V9.62744L14.0824 11.9868L10.1057 14.2765Z"
        fill="url(#paint0_linear_4365_6770)"
        fill-opacity="0.5"
      />
      <path
        d="M18.0591 9.62744L22 7.36113M18.0591 9.62744V14.3462M18.0591 9.62744L10.1057 5.10743M6.04837 2.80162L10.1057 0.320312L22 7.36113M6.04837 2.80162L2 5.22917M6.04837 2.80162L10.1057 5.10743M10.1057 14.2765V9.62744M10.1057 14.2765L14.0824 11.9868M10.1057 14.2765L6.04837 16.731M22 7.36113V12.046M10.1057 23.7091L22 16.731V12.046M10.1057 23.7091V18.9883M10.1057 23.7091L6.04837 21.4696M10.1057 18.9883L18.0591 14.3462M10.1057 18.9883L6.04837 16.731M22 12.046L18.0591 14.3462M18.0591 14.3462L14.0824 11.9868M10.1057 9.62744L14.0824 11.9868M10.1057 9.62744V5.10743M6.04837 21.4696L2 18.9883V5.22917M6.04837 21.4696V16.731M2 5.22917L6.04837 7.5582M6.04837 16.731V7.5582M10.1057 5.10743L6.04837 7.5582"
        stroke="white"
        stroke-opacity="0.75"
        stroke-width="0.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4365_6770"
          x1="12"
          y1="0.612815"
          x2="12"
          y2="23.7091"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class FloridaIcon {
  @Input() className: any = "";
}
