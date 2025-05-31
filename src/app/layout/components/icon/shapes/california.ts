import { Component, Input } from "@angular/core";

@Component({
  selector: "CaliforniaIcon",
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
        d="M12 0.439453L22 6.21386V8.39531L19.9118 9.61004L22 10.6195V12.8865L19.9118 14.1102L22 15.2818V17.6081L12 23.5371L2 17.6081V15.2818L4.08818 14.1102L2 12.8865V10.6195L4.08818 9.61004L2 8.39531V6.21386L12 0.439453Z"
        fill="url(#paint0_linear_4365_6844)"
        fill-opacity="0.5"
      />
      <path
        d="M22 6.21386L12 0.439453L2 6.21386M22 6.21386L12 11.8337M22 6.21386V8.39531L19.9118 9.61004M12 23.5371L22 17.6081V15.2818M12 23.5371L2 17.6081V15.2818M12 23.5371V21.2536M2 6.21386L12 11.8337M2 6.21386V8.39531L4.08818 9.61004M12 11.8337V14.2125M12 14.2125L4.08818 9.61004M12 14.2125L19.9118 9.61004M12 16.565L22 10.6195M12 16.565L2 10.6195M12 16.565V18.9011M22 10.6195V12.8865L19.9118 14.1102M22 10.6195L19.9118 9.61004M2 10.6195V12.8865L4.08818 14.1102M2 10.6195L4.08818 9.61004M12 18.9011L4.08818 14.1102M12 18.9011L19.9118 14.1102M12 21.2536L22 15.2818M12 21.2536L2 15.2818M22 15.2818L19.9118 14.1102M2 15.2818L4.08818 14.1102"
        stroke="white"
        stroke-opacity="0.75"
        stroke-width="0.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4365_6844"
          x1="12"
          y1="0.728315"
          x2="12"
          y2="23.5371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class CaliforniaIcon {
  @Input() className: any = "";
}
