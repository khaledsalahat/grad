import { Component, Input } from "@angular/core";

@Component({
  selector: "IconFileFade",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      [class]="className"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.9993 3.33301H13.3327C9.65078 3.33301 6.66602 6.31778 6.66602 9.99968V29.9997C6.66602 33.6816 9.65078 36.6663 13.3327 36.6663H26.666C30.3479 36.6663 33.3327 33.6816 33.3327 29.9997V16.6663H24.9993C22.2379 16.6663 19.9993 14.4278 19.9993 11.6663V3.33301ZM13.3327 23.333C13.3327 22.4125 14.0789 21.6663 14.9993 21.6663H19.9993C20.9198 21.6663 21.666 22.4125 21.666 23.333C21.666 24.2535 20.9198 24.9997 19.9993 24.9997H14.9993C14.0789 24.9997 13.3327 24.2535 13.3327 23.333ZM14.9993 28.333C14.0789 28.333 13.3327 29.0792 13.3327 29.9997C13.3327 30.9201 14.0789 31.6663 14.9993 31.6663H25.8327C26.7532 31.6663 27.4993 30.9201 27.4993 29.9997C27.4993 29.0792 26.7532 28.333 25.8327 28.333H14.9993Z"
        fill="url(#paint0_linear_4307_7477)"
      />
      <path
        d="M32.3564 13.333L23.3327 4.30932V11.6663C23.3327 12.5868 24.0789 13.333 24.9993 13.333H32.3564Z"
        fill="url(#paint1_linear_4307_7477)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4307_7477"
          x1="19.9994"
          y1="3.74988"
          x2="19.9994"
          y2="36.6663"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4307_7477"
          x1="19.9994"
          y1="3.74988"
          x2="19.9994"
          y2="36.6663"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class FileFade {
  @Input() className: any = "";
}
