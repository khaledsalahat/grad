import { Component, Input } from "@angular/core";

@Component({
  selector: "IconUsers",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      [class]="className"
    >
      <path
        d="M12.5 5C8.8181 5 5.83333 7.98477 5.83333 11.6667C5.83333 15.3486 8.8181 18.3333 12.5 18.3333C16.1819 18.3333 19.1667 15.3486 19.1667 11.6667C19.1667 7.98477 16.1819 5 12.5 5Z"
        fill="url(#paint0_linear_4268_11848)"
      />
      <path
        d="M27.5 5C23.8181 5 20.8333 7.98477 20.8333 11.6667C20.8333 15.3486 23.8181 18.3333 27.5 18.3333C31.1819 18.3333 34.1667 15.3486 34.1667 11.6667C34.1667 7.98477 31.1819 5 27.5 5Z"
        fill="url(#paint1_linear_4268_11848)"
      />
      <path
        d="M22.8637 27.4766C20.8305 22.6078 16.7431 20 12.5005 20C8.25791 20 4.1705 22.6078 2.13728 27.4766C1.4123 29.2126 1.70744 30.9304 2.58436 32.2632C2.70963 32.4536 2.84678 32.6361 2.99452 32.8097C4.14622 34.163 5.94293 35 7.86536 35H17.1356C19.0581 35 20.8548 34.163 22.0065 32.8097C23.1884 31.4208 23.6923 29.4606 22.8637 27.4766Z"
        fill="url(#paint2_linear_4268_11848)"
      />
      <path
        d="M25.9396 26.1921C25.1268 24.2458 24.0273 22.56 22.7181 21.1705C24.2135 20.397 25.8453 20 27.5007 20C31.7433 20 35.8307 22.6078 37.8639 27.4766C38.6924 29.4606 38.1886 31.4208 37.0066 32.8097C35.8549 34.163 34.0582 35 32.1358 35H24.5194L24.545 34.97C26.4372 32.7466 27.31 29.4737 25.9396 26.1921Z"
        fill="url(#paint3_linear_4268_11848)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4268_11848"
          x1="20.0006"
          y1="5.37518"
          x2="20.0006"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4268_11848"
          x1="20.0006"
          y1="5.37518"
          x2="20.0006"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4268_11848"
          x1="20.0006"
          y1="5.37518"
          x2="20.0006"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_4268_11848"
          x1="20.0006"
          y1="5.37518"
          x2="20.0006"
          y2="35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class IconUsers {
  @Input() className: any = "";
}
