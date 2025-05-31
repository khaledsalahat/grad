import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "wedding-destination-grid-card",
  standalone: true,
  imports: [CommonModule, AnimatedContainer],
  template: ` <animated-container
    [delay]="delay"
    enterClass="animate-zoomfadein"
    [className]="
      twMerge(
        'min-[1200px]:absolute relative overflow-hidden shadow-blue-card rounded-3xl lg:rounded-4xl',
        className
      )
    "
  >
    <div
      class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]"
    ></div>
    <img
      class="object-cover -z-2 !w-full !h-full"
      [src]="image"
      alt="Travel Destination Grid Card Image"
    />
    <div class="absolute inset-x-6 bottom-4 flex items-center justify-between">
      <span class="text-3xl font-semibold text-surface-0">{{ title }}</span>
      <a
        class="cursor-pointer w-12 h-12 px-8 flex items-center justify-center rounded-full bg-white/12 hover:bg-white/16 transition-all border border-white/8 backdrop-blur-[6px] shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02)]"
      >
        <i class="pi pi-arrow-right text-surface-0 !text-lg"></i>
      </a>
    </div>
  </animated-container>`,
})
export class WeddingDestinationGridCard {
  @Input() className?: string;
  @Input() image!: string;
  @Input() title!: string;
  @Input() href!: string;

  delay: number = Math.floor(Math.random() * 500);

  twMerge = twMerge;
}
