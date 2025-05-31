import { Component, Input } from "@angular/core";

@Component({
  selector: "IconQuestionsComments",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      [class]="className"
    >
      <path
        d="M1.6975 25.8594H11.7969C18.2582 25.8594 23.5156 20.602 23.5156 14.1406C23.5156 7.6793 18.2582 2.42188 11.7969 2.42188C5.33555 2.42188 0 7.6793 0 14.1406C0 17.2294 1.29578 20.1774 3.44609 22.362L1.6975 25.8594ZM12.9688 21.1719H10.625V18.8281H12.9688V21.1719ZM11.7969 7.10938C14.3821 7.10938 16.4844 9.21164 16.4844 11.7969C16.4844 13.5478 15.5196 15.1409 13.9666 15.9522C13.351 16.2749 12.9688 16.9627 12.9688 17.6562H10.625C10.625 16.0289 11.4891 14.603 12.8795 13.8762C13.6577 13.4688 14.1406 12.6723 14.1406 11.7969C14.1406 10.5048 13.0889 9.45312 11.7969 9.45312C10.5048 9.45312 9.45312 10.5048 9.45312 11.7969H7.10938C7.10938 9.21164 9.21164 7.10938 11.7969 7.10938Z"
        fill="url(#paint0_linear_4240_6628)"
      />
      <path
        d="M25.8469 14.3862C25.7433 20.3324 21.9345 25.3776 16.6328 27.3284C17.3649 33.0912 22.2447 37.5781 28.203 37.5781H38.3024L36.5538 34.0808C38.7041 31.8962 39.9999 28.9481 39.9999 25.8594C39.9999 19.3873 34.6751 14.1406 28.203 14.1406C27.3966 14.1406 26.6088 14.2257 25.8469 14.3862ZM34.0624 29.375H24.6874V27.0312H34.0624V29.375ZM34.0624 24.6875H24.6874V22.3438H34.0624V24.6875Z"
        fill="url(#paint1_linear_4240_6628)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4240_6628"
          x1="11.7578"
          y1="2.71499"
          x2="11.7578"
          y2="25.8594"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4240_6628"
          x1="28.3164"
          y1="14.4337"
          x2="28.3164"
          y2="37.5781"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class QuestionsComments {
  @Input() className: any = "";
}
