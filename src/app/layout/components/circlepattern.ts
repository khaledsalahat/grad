import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "circle-pattern",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="twMerge('pointer-events-none', className)">
      <div
        class="flex items-center justify-center rounded-full border border-white/0 w-full aspect-square bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.00)_32.21%)] shadow-[0px_-18px_58px_0px_rgba(0,0,0,0.06)]"
      >
        <div
          class="flex items-center justify-center rounded-full border border-white/0 w-[85%] aspect-square bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.00)_32.21%)] shadow-[0px_-18px_58px_0px_rgba(0,0,0,0.06)]"
        >
          <div
            class="flex items-center justify-center rounded-full w-[80%] aspect-square bg-[linear-gradient(180deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.00)_32.21%)] shadow-[0px_-18px_58px_0px_rgba(0,0,0,0.06)]"
          ></div>
        </div>
      </div>
    </div>
  `,
})
export class CirclePattern {
  @Input() className?: string;

  twMerge = twMerge;
}
