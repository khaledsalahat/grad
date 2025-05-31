import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";

@Component({
  selector: "enterprise-timelapse",
  standalone: true,
  imports: [AnimatedContainer, CommonModule],
  template: `
    <div
      class="container mt-24 lg:mt-64 flex lg:flex-row flex-col items-center lg:items-start justify-center gap-16 lg:gap-6 relative"
    >
      <animated-container
        [delay]="1000"
        className="w-[70%] mx-auto h-[5.5rem] bg-main-gradient-to-left absolute z-0 top-14 hidden lg:flex items-center justify-center"
      >
        <span class="border-t-4 border-dotted border-white/64 w-full"></span>
      </animated-container>

      <animated-container
        *ngFor="let item of enterpriseTimelapseData; let index = index"
        [delay]="index * 300"
        className="flex-1 flex flex-col items-center relative z-5"
      >
        <div
          class="w-48 h-48 rounded-full flex items-center justify-center bg-surface-0 shadow-blue-card"
        >
          <div
            class="w-40 h-40 rounded-full flex items-center justify-center bg-main-gradient"
          >
            <div
              class="w-[calc(100%-2px)] h-[calc(100%-2px)] rounded-full bg-surface-0 flex items-center justify-center"
            >
              <span
                class="text-8xl leading-none font-semibold text-surface-950"
                >{{ item.header }}</span
              >
            </div>
          </div>
        </div>
        <h5
          class="mt-12 text-3xl font-semibold text-surface-950 dark:text-surface-0 text-center"
        >
          {{ item.title }}
        </h5>
        <p class="mt-6 text-xl text-surface-500 text-center max-w-md">
          {{ item.description }}
        </p>
      </animated-container>
    </div>
  `,
})
export class EnterpriseTimelapse {
  enterpriseTimelapseData = [
    {
      header: "01",
      title: "Planning & Strategy",
      description:
        "Outline your goals and create a roadmap for success. Effective planning is key.",
    },
    {
      header: "02",
      title: "Tech Setup",
      description:
        "Implement the right infrastructure to boost efficiency. Choose secure and scalable solutions.",
    },
    {
      header: "03",
      title: "Training & Implementation",
      description:
        "Train your team on new systems for smooth adoption and efficient use.",
    },
  ];
}
