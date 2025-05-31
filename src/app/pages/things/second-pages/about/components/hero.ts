import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { CirclePattern } from "@/layout/components/circlepattern";
import { AppNavbar } from "@/layout/components/app.navbar";

@Component({
  selector: "about-hero",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, CirclePattern, AppNavbar],
  template: `
    <animated-container [className]="isWide() ? 'relative' : 'pt-6'">
      <div
        *ngIf="isWide()"
        class="bg-main-gradient absolute top-0 inset-x-0 h-[45rem] lg:h-[51.5rem]"
      ></div>
      <div class="container relative">
        <div
          [ngClass]="{
            'absolute top-0 left-4 right-4 h-[45rem] lg:h-[51.5rem]': true,
            'bg-main-gradient rounded-3xl lg:rounded-4xl': !isWide(),
          }"
        >
          <div class="absolute inset-0 overflow-hidden lg:block hidden">
            <circle-pattern
              class="absolute w-[82rem] -bottom-full translate-y-24 left-1/2 -translate-x-1/2"
            />
          </div>
        </div>
        <div class="relative z-20">
          <app-navbar />
          <h1
            class="max-w-[calc(100%-3rem)] md:max-w-5xl mx-auto title lg:text-7xl text-4xl text-center mt-18"
          >
            Discover How We Strive to Deliver Unparalleled Innovation
          </h1>
          <p
            class="mt-6 max-w-[calc(100%-3rem)] md:max-w-2xl text-lg lg:text-xl text-white/64 text-center mx-auto"
          >
            We develop cutting-edge solutions and provide exceptional services
            to drive our clients’ success and exceed their expectations.
          </p>
        </div>
        <div
          class="relative z-10 h-[35rem] max-w-[calc(100%-3rem)] lg:max-w-[calc(100%-12rem)] mt-12 lg:mt-48 mx-auto rounded-3xl lg:rounded-4xl shadow-black-card overflow-hidden"
        >
          <img
            class="object-cover w-full h-full"
            src="/pages/about/hero-image.jpg"
            alt="Blog Hero Image"
          />
        </div>
        <div
          class="max-w-[calc(100%-3rem)] lg:max-w-[calc(100%-12rem)] mx-auto mt-16 flex flex-wrap gap-6"
        >
          <animated-container
            *ngFor="let item of stats; let index = index"
            [delay]="index * 100"
            className="flex flex-col items-center justify-center gap-4 rounded-3xl p-7 flex-1 shadow-stroke dark:shadow-none border-0 dark:border dark:border-white/12"
          >
            <span
              class="text-4xl font-semibold text-surface-950 dark:text-surface-0"
              >{{ item.value }}</span
            >
            <span class="text-surface-500 dark:text-white/64 text-center">{{
              item.label
            }}</span>
          </animated-container>
        </div>
      </div>
    </animated-container>
  `,
})
export class AboutHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());

  stats = [
    {
      label: "years of experience",
      value: "20+",
    },
    {
      label: "10,000 successful projects.",
      value: "10K+",
    },
    {
      label: "95% customer satisfaction.",
      value: "95%",
    },
    {
      label: "over 15 awards",
      value: "15+",
    },
  ];
}
