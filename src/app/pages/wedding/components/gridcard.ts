import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { twMerge } from "tailwind-merge";

@Component({
  selector: "wedding-halls-grid-card",
  standalone: true,
  imports: [CommonModule, AnimatedContainer, RouterLink],
  template: `
    <animated-container
      [delay]="delay"
      enterClass="animate-zoomfadein"
      [className]="
        twMerge(
          'relative overflow-hidden shadow-blue-card rounded-3xl lg:rounded-4xl w-full h-full',
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
        [alt]="title + ' Image'"
        (error)="handleImageError($event)"
      />
      <div
        class="absolute inset-x-6 bottom-4 flex items-center justify-between"
      >
        <div class="flex flex-col">
          <span class="text-3xl font-semibold text-surface-0">{{ title }}</span>
          <span class="text-lg text-surface-100 mt-1 flex items-center">
            <i class="pi pi-map-marker text-sm mr-2"></i>
            {{ location }}
          </span>
        </div>
        <a
          [routerLink]="href"
          class="cursor-pointer w-12 h-12 flex items-center justify-center rounded-full bg-white/12 hover:bg-white/16 transition-all border border-white/8 backdrop-blur-[6px] shadow-lg"
        >
          <i class="pi pi-arrow-right text-surface-0 !text-lg"></i>
        </a>
      </div>
    </animated-container>
  `,
})
export class WeddingHallsGridCard {
  @Input() className?: string;
  @Input() image!: string;
  @Input() title!: string;
  @Input() location!: string;
  @Input() href!: string;
  @Input() delay: number = 0;
  @Input() cardIndex: number = 0;

  twMerge = twMerge;

  handleImageError(event: any) {
    event.target.src = '/assets/images/venues/placeholder.svg';
    event.target.onerror = null;
  }
}
