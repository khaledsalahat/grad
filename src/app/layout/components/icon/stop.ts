import { Component, Input } from "@angular/core";

@Component({
  selector: "IconStop",
  standalone: true,
  template: `
    <svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [class]="className"
    >
      <path
        d="M18 36.5C8.0586 36.5 0 28.4414 0 18.5C0 8.5586 8.0586 0.5 18 0.5C27.9414 0.5 36 8.5586 36 18.5C36 28.4414 27.9414 36.5 18 36.5ZM12.6 13.1V23.9H16.2V13.1H12.6ZM19.8 13.1V23.9H23.4V13.1H19.8Z"
      />
    </svg>
  `,
})
export class IconStop {
  @Input() className: any = "";
}
