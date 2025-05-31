import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "ui-carousel-item",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="itemClass">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    "[class]": "containerClass",
  },
})
export class UICarouselItem {
  @Input() className: string = "";
  @Input() scaled: boolean = false;

  get containerClass(): string {
    return twMerge(
      "min-w-0 pl-[var(--slide-spacing)] flex-[0_0_var(--slide-size)]",
      this.scaled ? "embla__slide [transform:translate3d(0,0,0)]" : "",
      this.className,
    );
  }

  get itemClass(): string {
    return twMerge(
      "flex items-center justify-center h-[var(--slide-height)] select-none",
      this.scaled ? "embla__slide__item" : "",
    );
  }
}
