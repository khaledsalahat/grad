import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { AppNavbar } from "@/layout/components/app.navbar";
import { StaticCustomers } from "@/layout/components/staticcustomers";

@Component({
  selector: "e-learning-hero",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, AppNavbar, StaticCustomers],
  template: `
    <animated-container [className]="isWide() ? '' : 'pt-6'">
      <div
        *ngIf="isWide()"
        class="absolute top-0 left-0 w-full h-[51rem] lg:h-[54.5rem] shadow-black-card"
      >
        <div
          class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.40)_0%,rgba(0,0,0,0.40)_100%)]"
        ></div>
        <img
          class="object-cover min-w-96 absolute top-0 bottom-0 right-0 left-0 w-full h-full -z-2"
          src="/pages/e-learning/hero-background.jpg"
          alt="E-learning Hero Image"
        />
      </div>

      <div class="container">
        <div
          [ngClass]="{
            'h-[51rem]': true,
            'lg:h-[54.5rem]': true,
            relative: true,
            'rounded-3xl lg:rounded-4xl overflow-hidden shadow-black-card':
              !isWide(),
          }"
        >
          <app-navbar />
          <div class="absolute bottom-6 lg:bottom-24 inset-x-6 lg:inset-x-24">
            <h1 class="title lg:text-7xl text-4xl max-w-[42rem]">
              Unlock Your Potential with Expert-Led Courses
            </h1>
            <p class="description max-w-[42rem] mt-6">
              Explore our curated selection of high-quality courses. Each lesson
              is designed to perfection, blending expert knowledge with
              innovative learning methods.
            </p>
            <div class="mt-10 flex items-center gap-3">
              <button class="button-regular">Get Started</button>
              <button class="button-outlined">
                <i class="pi pi-play-circle"></i>
                Discover Now
              </button>
            </div>
          </div>

          <ng-container *ngIf="!isWide()">
            <div
              class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.40)_0%,rgba(0,0,0,0.40)_100%)]"
            ></div>
            <img
              class="object-cover min-w-96 absolute top-0 bottom-0 right-0 left-0 w-full h-full -z-2"
              src="/pages/e-learning/hero-background.jpg"
              alt="E-learning Hero Image"
            />
          </ng-container>
        </div>
        <static-customers className="mt-16" />
      </div>
    </animated-container>
  `,
})
export class ELearningHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());
}
