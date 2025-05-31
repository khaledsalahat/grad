import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { AppNavbar } from "@/layout/components/app.navbar";
import { CirclePattern } from "@/layout/components/circlepattern";
import { LayoutService } from "@/layout/service/layout.service";
import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";

@Component({
  selector: "blog-hero",
  standalone: true,
  imports: [CommonModule, AnimatedContainer, CirclePattern, AppNavbar],
  template: ` <animated-container [class]="isWide() ? 'relative' : 'pt-6'">
    <div
      *ngIf="isWide()"
      class="bg-main-gradient h-[45rem] lg:h-[51.5rem] absolute top-0 inset-x-0"
    ></div>
    <div class="container relative">
      <div
        [class]="
          'h-[45rem] lg:h-[51.5rem] absolute top-0 left-4 right-4 ' +
          (isWide() ? '' : 'bg-main-gradient rounded-3xl lg:rounded-4xl')
        "
      >
        <div class="absolute inset-0 overflow-hidden lg:block hidden">
          <circle-pattern
            className="absolute w-[82rem] -bottom-full translate-y-24"
          />
        </div>
      </div>
      <div class="relative z-20">
        <app-navbar />
        <h1
          class="max-w-[calc(100%-3rem)] lg:max-w-5xl mx-auto title lg:text-6xl text-4xl text-center mt-18"
        >
          SaaS Solutions and Pricing Strategies for Startups in 2025
        </h1>
        <p
          class="mt-6 max-w-[calc(100%-3rem)] lg:max-w-3xl text-lg lg:text-xl text-white/64 text-center mx-auto"
        >
          Explore the latest SaaS solutions and standout pricing strategies for
          this year. Learn how to reduce costs while strengthening customer
          relationships for your business.
        </p>
      </div>
      <div
        class="relative z-10 h-[35rem] max-w-[calc(100%-3rem)] lg:max-w-[calc(100%-12rem) mt-20 lg:mt-40 mx-auto rounded-4xl shadow-black-card overflow-hidden"
      >
        <img
          class="object-cover w-full h-full"
          src="/pages/blog/blog-hero.jpg"
          alt="Blog Hero Image"
        />
      </div>
      <div class="max-w-[calc(100%-3rem)] lg:max-w-[62rem] mx-auto mt-10">
        <a class="flex items-center justify-between gap-4">
          <span
            class="flex-1 text-xl font-semibold text-surface-950 dark:text-surface-0"
            >SaaS Solutions for Small Businesses: What to Expect in 2025</span
          >
          <i class="pi pi-arrow-right"></i>
        </a>
        <p class="mt-3 text-surface-500 dark:text-white/64">
          Discover SaaS solutions that help small businesses automate processes,
          reduce costs, and improve customer relationships. Learn about the top
          SaaS trends for small businesses in 2025.
        </p>
      </div>
    </div>
  </animated-container>`,
})
export class BlogHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());
}
