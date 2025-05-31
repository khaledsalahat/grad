import { Component, Input } from "@angular/core";

@Component({
  selector: "ServerBoxIcon",
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
        d="M3.3335 13.3334C3.3335 9.65152 6.31826 6.66675 10.0002 6.66675H30.0002C33.6821 6.66675 36.6668 9.65152 36.6668 13.3334V18.3334H3.3335V13.3334ZM10.8335 12.5001C10.8335 13.4206 10.0873 14.1667 9.16683 14.1667C8.24635 14.1667 7.50016 13.4206 7.50016 12.5001C7.50016 11.5796 8.24635 10.8334 9.16683 10.8334C10.0873 10.8334 10.8335 11.5796 10.8335 12.5001Z"
        fill="url(#paint0_linear_4262_7347)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.3335 21.6667H36.6668V26.6667C36.6668 30.3486 33.6821 33.3334 30.0002 33.3334H10.0002C6.31826 33.3334 3.3335 30.3486 3.3335 26.6667V21.6667ZM10.8335 27.5001C10.8335 28.4206 10.0873 29.1667 9.16683 29.1667C8.24635 29.1667 7.50016 28.4206 7.50016 27.5001C7.50016 26.5796 8.24635 25.8334 9.16683 25.8334C10.0873 25.8334 10.8335 26.5796 10.8335 27.5001Z"
        fill="url(#paint1_linear_4262_7347)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4262_7347"
          x1="20.6538"
          y1="7.97988"
          x2="20.6538"
          y2="30.5051"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4262_7347"
          x1="20.6538"
          y1="7.97988"
          x2="20.6538"
          y2="30.5051"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class ServerBoxIcon {
  @Input() className: any = "";
}
