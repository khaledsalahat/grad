import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "travel-destination-grid-card",
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
    </div>
  </animated-container>`,
})
export class TravelDestinationGridCard {
  @Input() className?: string;
  @Input() image!: string;
  @Input() title!: string;
  @Input() href!: string;

  delay: number = Math.floor(Math.random() * 500);

  twMerge = twMerge;
}
