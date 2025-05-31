import { Component, Input } from "@angular/core";

@Component({
  selector: "IconBook",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      [class]="className"
    >
      <g clip-path="url(#clip0_4307_7474)">
        <g filter="url(#filter0_d_4307_7474)">
          <path
            d="M18.3327 13.3334C18.3327 9.65152 15.3479 6.66675 11.666 6.66675H1.66602V33.3334H14.9993C16.8403 33.3334 18.3327 34.8258 18.3327 36.6667V13.3334Z"
            fill="url(#paint0_linear_4307_7474)"
            shape-rendering="crispEdges"
          />
          <path
            d="M21.666 36.6667C21.666 34.8258 23.1584 33.3334 24.9993 33.3334H38.3327V6.66675H28.3327C24.6508 6.66675 21.666 9.65152 21.666 13.3334V36.6667Z"
            fill="url(#paint1_linear_4307_7474)"
            shape-rendering="crispEdges"
          />
          <path
            d="M18.0827 13.3334V34.8399C17.4583 33.7883 16.3111 33.0834 14.9993 33.0834H1.91602V6.91675H11.666C15.2098 6.91675 18.0827 9.78959 18.0827 13.3334ZM24.9993 33.0834C23.6876 33.0834 22.5404 33.7883 21.916 34.8399V13.3334C21.916 9.78959 24.7889 6.91675 28.3327 6.91675H38.0827V33.0834H24.9993Z"
            stroke="url(#paint2_linear_4307_7474)"
            stroke-width="0.5"
            shape-rendering="crispEdges"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_4307_7474"
          x="-2.33398"
          y="3.66675"
          width="44.6665"
          height="38"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4307_7474"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4307_7474"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_4307_7474"
          x1="19.9993"
          y1="7.04193"
          x2="19.9993"
          y2="36.6667"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4307_7474"
          x1="19.9993"
          y1="7.04193"
          x2="19.9993"
          y2="36.6667"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4307_7474"
          x1="19.9993"
          y1="6.66675"
          x2="19.9993"
          y2="36.6667"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="0.586424" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <clipPath id="clip0_4307_7474">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  `,
})
export class IconBook {
  @Input() className: any = "";
}
