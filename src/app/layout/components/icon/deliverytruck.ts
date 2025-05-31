import { Component, Input } from "@angular/core";

@Component({
  selector: "DeliveryTruck",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      [class]="className"
    >
      <g clip-path="url(#clip0_4200_8536)">
        <path
          d="M17.1826 22.2031H18.086C18.4671 20.3333 20.124 18.9219 22.1045 18.9219C24.085 18.9219 25.7419 20.3333 26.123 22.2031H27.8467C28.3 22.2031 28.667 21.8361 28.667 21.3828V18.9219H25.3857C24.9324 18.9219 24.5654 18.5549 24.5654 18.1016C24.5654 17.6483 24.9324 17.2812 25.3857 17.2812H28.667V15.6406H17.1826V22.2031Z"
          fill="url(#paint0_linear_4200_8536)"
        />
        <path
          d="M24.5654 9.07812H18.0029C17.5496 9.07812 17.1826 9.44513 17.1826 9.89844V14H28.2857L25.248 9.44342C25.0956 9.21506 24.8395 9.07812 24.5654 9.07812Z"
          fill="url(#paint1_linear_4200_8536)"
        />
        <path
          d="M27.8467 23.8438H24.4148C24.5065 23.5859 24.5654 23.3127 24.5654 23.0234C24.5654 21.6644 23.4636 20.5625 22.1045 20.5625C20.7454 20.5625 19.6436 21.6644 19.6436 23.0234C19.6436 23.3127 19.7025 23.5859 19.7942 23.8438H9.53983C9.63147 23.5859 9.69043 23.3127 9.69043 23.0234C9.69043 21.6644 8.58856 20.5625 7.22949 20.5625C5.87042 20.5625 4.76855 21.6644 4.76855 23.0234C4.76855 23.3127 4.82751 23.5859 4.91916 23.8438H1.4873C1.034 23.8438 0.666992 24.2108 0.666992 24.6641C0.666992 25.1174 1.034 25.4844 1.4873 25.4844H27.8467C28.3 25.4844 28.667 25.1174 28.667 24.6641C28.667 24.2108 28.3 23.8438 27.8467 23.8438Z"
          fill="url(#paint2_linear_4200_8536)"
        />
        <path
          d="M1.4873 5.79688H16.3623C16.8156 5.79688 17.1826 5.42987 17.1826 4.97656V3.33594C17.1826 2.88263 16.8156 2.51562 16.3623 2.51562H1.4873C1.034 2.51562 0.666992 2.88263 0.666992 3.33594V4.97656C0.666992 5.42987 1.034 5.79688 1.4873 5.79688Z"
          fill="url(#paint3_linear_4200_8536)"
        />
        <path
          d="M15.542 15.6406V7.4375H2.30762V15.6406H15.542ZM6.40918 12.3594H9.69043C10.1437 12.3594 10.5107 12.7264 10.5107 13.1797C10.5107 13.633 10.1437 14 9.69043 14H6.40918C5.95587 14 5.58887 13.633 5.58887 13.1797C5.58887 12.7264 5.95587 12.3594 6.40918 12.3594Z"
          fill="url(#paint4_linear_4200_8536)"
        />
        <path
          d="M1.4873 22.2031H3.21103C3.59213 20.3333 5.24899 18.9219 7.22949 18.9219C9.20999 18.9219 10.8669 20.3333 11.248 22.2031H15.542V17.2812H1.4873C1.03421 17.2812 0.666992 17.6485 0.666992 18.1016V21.3828C0.666992 21.8359 1.03421 22.2031 1.4873 22.2031Z"
          fill="url(#paint5_linear_4200_8536)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_4200_8536"
          x1="23.15"
          y1="15.9638"
          x2="23.15"
          y2="21.5071"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4200_8536"
          x1="22.9519"
          y1="9.32049"
          x2="22.9519"
          y2="13.478"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4200_8536"
          x1="15.216"
          y1="20.8049"
          x2="15.216"
          y2="24.9624"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_4200_8536"
          x1="9.24864"
          y1="2.6772"
          x2="9.24864"
          y2="5.44886"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_4200_8536"
          x1="9.1843"
          y1="7.84144"
          x2="9.1843"
          y2="14.7706"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_4200_8536"
          x1="8.39616"
          y1="17.5236"
          x2="8.39616"
          y2="21.6811"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <clipPath id="clip0_4200_8536">
          <rect
            width="28"
            height="28"
            fill="white"
            transform="translate(0.666992)"
          />
        </clipPath>
      </defs>
    </svg>
  `,
})
export class DeliveryTruck {
  @Input() className: any = "";
}
