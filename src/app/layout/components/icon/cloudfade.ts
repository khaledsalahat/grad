import { Component, Input } from "@angular/core";

@Component({
  selector: "IconCloudFade",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 46 40"
      fill="none"
      [class]="className"
    >
      <g filter="url(#filter0_d_4067_4917)">
        <path
          d="M22.9993 6.6665C18.2358 6.6665 14.1426 9.52053 12.3297 13.6079C7.93337 14.6607 4.66602 18.6142 4.66602 23.3332C4.66602 28.856 9.14317 33.3332 14.666 33.3332H32.9993C37.6017 33.3332 41.3327 29.6022 41.3327 24.9998C41.3327 20.9337 38.4205 17.5477 34.568 16.8139C33.8234 11.0884 28.9278 6.6665 22.9993 6.6665Z"
          fill="url(#paint0_linear_4067_4917)"
          shape-rendering="crispEdges"
        />
        <path
          d="M12.388 13.851L12.5082 13.8223L12.5583 13.7093C14.3325 9.70891 18.3383 6.9165 22.9993 6.9165C28.8006 6.9165 33.5915 11.2436 34.3201 16.8462L34.3434 17.0256L34.5212 17.0595C38.258 17.7713 41.0827 21.0559 41.0827 24.9998C41.0827 29.4641 37.4636 33.0832 32.9993 33.0832H14.666C9.28124 33.0832 4.91602 28.7179 4.91602 23.3332C4.91602 18.7325 8.10143 14.8775 12.388 13.851Z"
          stroke="url(#paint1_linear_4067_4917)"
          stroke-width="0.5"
          shape-rendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_4067_4917"
          x="0.666016"
          y="3.6665"
          width="44.6667"
          height="34.6667"
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
            result="effect1_dropShadow_4067_4917"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4067_4917"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_4067_4917"
          x1="22.9994"
          y1="7"
          x2="22.9994"
          y2="33.3332"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4067_4917"
          x1="22.9993"
          y1="6.6665"
          x2="22.9993"
          y2="33.3332"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="0.586424" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class Cloudfade {
  @Input() className: any = "";
}
