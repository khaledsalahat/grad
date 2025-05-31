import { Component, Input } from "@angular/core";

@Component({
  selector: "IconPlay2",
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      [class]="className"
    >
      <path
        d="M18.6618 4.5307C14.2287 1.6175 8.33398 4.79742 8.33398 10.1021V29.898C8.33398 35.2027 14.2287 38.3826 18.6618 35.4694L33.724 25.5714C37.7313 22.938 37.7313 17.0621 33.724 14.4287L18.6618 4.5307Z"
        fill="white"
      />
    </svg>
  `,
})
export class IconPlay2 {
  @Input() className: any = "";
}
