import { Component, Input } from "@angular/core";

@Component({
  selector: "IconShapesGenesisLogo",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 396 396"
      fill="none"
      [class]="className"
    >
      <path
        d="M380.226 198.002C388.94 198.002 396.069 190.926 395.375 182.241C392.692 148.634 381.461 116.174 362.634 87.9979C340.877 55.4367 309.954 30.0583 273.774 15.0721C237.593 0.0857904 197.782 -3.8353 159.373 3.80463C120.965 11.4446 85.6844 30.3024 57.9934 57.9934C30.3024 85.6844 11.4446 120.965 3.80463 159.373C-3.8353 197.782 0.0857913 237.593 15.0721 273.774C30.0583 309.954 55.4367 340.877 87.9979 362.634C116.174 381.461 148.634 392.692 182.241 395.375C190.926 396.069 198.002 388.94 198.002 380.226V332.58C198.002 323.866 190.907 316.91 182.271 315.757C164.353 313.363 147.145 306.901 131.999 296.781C112.463 283.727 97.2356 265.173 88.2439 243.465C79.2521 221.757 76.8995 197.87 81.4834 174.825C86.0674 151.78 97.3821 130.611 113.997 113.997C130.611 97.3821 151.78 86.0674 174.825 81.4834C197.87 76.8995 221.757 79.2521 243.465 88.2439C265.173 97.2356 283.727 112.463 296.781 131.999C306.901 147.145 313.363 164.353 315.757 182.271C316.91 190.907 323.866 198.002 332.58 198.002H380.226Z"
        fill="url(#paint0_linear_4207_10793)"
      />
      <path
        d="M289.989 216.803C290.058 216.464 289.798 216.146 289.452 216.146H231.919C223.206 216.146 216.142 223.21 216.142 231.923V289.452C216.142 289.799 216.46 290.058 216.799 289.99C253.559 282.517 282.515 253.563 289.989 216.803Z"
        fill="url(#paint1_linear_4207_10793)"
      />
      <path
        d="M315.06 216.146C314.534 216.146 314.086 216.533 314.002 217.052C305.908 266.706 266.703 305.91 217.048 314.002C216.529 314.087 216.142 314.534 216.142 315.061V380.227C216.142 388.941 223.206 396.004 231.919 396.004H263.473C272.187 396.004 279.25 388.941 279.25 380.227V319.346C279.25 319.15 279.487 319.052 279.626 319.191L346.016 385.58C352.177 391.742 362.167 391.742 368.328 385.58L385.576 368.332C391.738 362.171 391.738 352.181 385.576 346.02L319.187 279.63C319.048 279.491 319.146 279.254 319.342 279.254H380.223C388.937 279.254 396 272.191 396 263.477V231.923C396 223.21 388.937 216.146 380.223 216.146H315.06Z"
        fill="url(#paint2_linear_4207_10793)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4207_10793"
          x1="198"
          y1="0"
          x2="198"
          y2="396.004"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4207_10793"
          x1="198"
          y1="0"
          x2="198"
          y2="396.004"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4207_10793"
          x1="198"
          y1="0"
          x2="198"
          y2="396.004"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class GenesisLogo {
  @Input() className: any = "";
}
