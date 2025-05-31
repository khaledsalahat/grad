import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";

@Component({
  selector: "travel-cta",
  standalone: true,
  imports: [AnimatedContainer, CommonModule],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div class="mt-32 flex md:flex-row flex-col gap-6">
        <ng-container *ngFor="let item of ctaData; let index = index">
          <animated-container
            [delay]="index * 150"
            className="relative lg:flex-1 h-[48rem] rounded-3xl lg:rounded-4xl shadow-blue-card overflow-hidden"
          >
            <div
              class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]"
            ></div>
            <div
              [style]="{
                writingMode: 'vertical-lr',
                transform: 'scale(-1, -1)',
              }"
              class="absolute bottom-12 right-4 text-[10rem] title bg-[linear-gradient(0deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.63)_100%)]"
            >
              {{ item.title }}
            </div>
            <img
              class="object-cover -z-2 w-full h-full"
              [src]="item.image"
              alt="Travel CTA Image"
            />
          </animated-container>
        </ng-container>
      </div>
    </div>
  `,
})
export class TravelCTA {
  ctaData = [
    {
      title: "Paris",
      image: "/pages/travel/grid-paris.jpg",
    },
    {
      title: "Spain",
      image: "/pages/travel/cta-spain.jpg",
    },
    {
      title: "Italy",
      image: "/pages/travel/cta-italy.jpg",
    },
  ];
}
