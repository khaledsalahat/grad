import { Component, Input } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";

interface RealEstateBestProjectItemProps {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: "real-estate-best-projects",
  standalone: true,
  imports: [AnimatedContainer, CommonModule],
  template: `
    <div class="mt-24 lg:mt-64 container">
      <div class="w-full flex flex-wrap items-start justify-between gap-6">
        <h1
          class="max-w-[36rem] text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 leading-tight"
        >
          The Best Project That We’ve Completed
        </h1>
        <div class="max-w-[34rem]">
          <p class="text-lg text-surface-500 dark:text-white/64">
            Our most notable achievement to date is the successful completion of
            a state-of-the-art residential complex in downtown Cityville. This
            project stands as a testament to our commitment to excellence and
            innovation in real estate development.
          </p>
          <button class="mt-6 button-gradient">
            Learn More
            <i class="pi pi-arrow-right !text-sm"></i>
          </button>
        </div>
      </div>
      <div class="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <animated-container
          *ngFor="let item of items; let index = index"
          [delay]="index * 200"
        >
          <div
            class="group relative h-[34rem] rounded-3xl overflow-hidden shadow-blue-card dark:shadow-none border-0 dark:border border-white/12"
          >
            <img
              class="object-cover -z-2 absolute w-full h-full"
              [src]="item.image"
              alt="Real Estate Partner Image"
            />
            <div
              class="-z-1 inset-0 absolute opacity-50 group-hover:opacity-100 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.48)_64.82%)] transition-all duration-300"
            ></div>
            <div
              class="group-hover:bottom-0 bottom-0 sm:-bottom-full absolute z-1 left-0 right-0 p-8 bg-surface-0 dark:bg-surface-950 rounded-t-3xl transition-all duration-300"
            >
              <a class="flex items-center justify-between gap-2 cursor-pointer">
                <h5
                  class="text-lg font-semibold text-surface-950 dark:text-surface-0"
                >
                  {{ item.title }}
                </h5>
                <i class="pi pi-arrow-right !text-sm"></i>
              </a>
              <p class="mt-3 text-surface-500 dark:text-white/64">
                {{ item.description }}
              </p>
            </div>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class RealEstateBestProjects {
  @Input() items: RealEstateBestProjectItemProps[] = [];
}
