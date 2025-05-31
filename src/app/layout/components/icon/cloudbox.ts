import { Component, Input } from "@angular/core";

@Component({
  selector: "CloudBoxIcon",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      [class]="className"
    >
      <path
        d="M19.9993 6.6665C15.2358 6.6665 11.1426 9.52053 9.32974 13.6079C4.93337 14.6607 1.66602 18.6142 1.66602 23.3332C1.66602 28.856 6.14317 33.3332 11.666 33.3332H29.9993C34.6017 33.3332 38.3327 29.6022 38.3327 24.9998C38.3327 20.9337 35.4205 17.5477 31.568 16.8139C30.8234 11.0884 25.9278 6.6665 19.9993 6.6665Z"
        fill="url(#paint0_linear_4262_7354)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4262_7354"
          x1="20.7183"
          y1="7.97963"
          x2="20.7183"
          y2="30.5049"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class CloudBoxIcon {
  @Input() className: any = "";
}
