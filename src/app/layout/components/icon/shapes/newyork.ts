import { Component, Input } from "@angular/core";

@Component({
  selector: "NewYorkIcon",
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
        d="M22 17.7751L12 23.5536L2 17.7751V6.218L12 0.439453L15.9773 2.73776V5.08921L17.9873 3.89927L22 6.08959V10.6268L19.9974 11.784L22 12.9382V17.7751Z"
        fill="url(#paint0_linear_4365_6838)"
        fill-opacity="0.5"
      />
      <path
        d="M22 6.08959L12 11.9109M22 6.08959V10.6268L19.9974 11.784M22 6.08959L17.9873 3.89927L15.9773 5.08921M12 23.5536L22 17.7751V12.9382M12 23.5536L2 17.7751V6.218M12 23.5536V18.7168M2 6.218L12 0.439453L15.9773 2.73776M2 6.218L5.96991 8.51203M12 11.9109V16.4054M12 11.9109L8.10824 9.74768M5.96991 8.51203V15.3353M5.96991 8.51203L15.9773 2.73776M5.96991 15.3353L12 18.7168M5.96991 15.3353L8.10824 14.1367M12 18.7168L22 12.9382M22 12.9382L19.9974 11.784M12 16.4054L8.10824 14.1367M12 16.4054L19.9974 11.784M8.10824 9.74768V14.1367M8.10824 9.74768L15.9773 5.08921M15.9773 2.73776V5.08921"
        stroke="white"
        stroke-opacity="0.75"
        stroke-width="0.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4365_6838"
          x1="12"
          y1="0.728522"
          x2="12"
          y2="23.5536"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class NewYorkIcon {
  @Input() className: any = "";
}
