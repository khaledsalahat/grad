import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { FloatingCustomers } from "@/layout/components/floatingcustomers";
import { AppNavbar } from "@/layout/components/app.navbar";
import { RouterLink } from "@angular/router";

@Component({
  selector: "real-estate-hero",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    FloatingCustomers,
    AppNavbar,
    RouterLink,
    FloatingCustomers,
  ],
  template: `
    <animated-container
      [className]="isWide() ? 'relative h-[56rem] lg:h-[50rem]' : 'pt-6'"
    >
      <div
        *ngIf="isWide()"
        class="absolute w-full h-[calc(100%-6rem)] top-0 left-0"
      >
        <img
          class="w-full h-full object-cover absolute inset-0 -z-2"
          src="/pages/real-estate/hero-background.jpg"
          alt="Logistic Hero Background Image"
        />
        <div
          class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]"
        ></div>
      </div>

      <div class="container">
        <div
          [ngClass]="{
            'h-[50rem] lg:h-[44rem] relative': true,
            'shadow-black-card overflow-hidden rounded-3xl lg:rounded-4xl':
              !isWide(),
          }"
        >
          <ng-container *ngIf="!isWide()">
            <img
              class="w-full h-full object-cover absolute inset-0 -z-2"
              src="/pages/real-estate/hero-background.jpg"
              alt="Logistic Hero Background Image"
            />
            <div
              class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]"
            ></div>
          </ng-container>

          <app-navbar />
          <div class="lg:mt-16 lg:ml-24 mt-10 px-6 lg:px-0">
            <h1 class="title text-4xl lg:text-8xl leading-tight max-w-5xl">
              Discover Your Perfect Dream Home
            </h1>
            <p class="mt-6 description text-white/72 max-w-lg">
              Browse our extensive listings to find the ideal property that fits
              your lifestyle and budget
            </p>
            <div class="mt-8 flex items-center gap-3">
              <a routerLink="" class="button-regular"> Get Started </a>
              <a routerLink="" class="button-outlined"> Explore </a>
            </div>
          </div>
        </div>
        <floating-customers
          className="mt-20"
          iconClass="[&_path]:fill-surface-500 dark:[&_path]:fill-white/64"
          labelClass="text-surface-500 dark:text-white/64"
        />
      </div>
    </animated-container>
  `,
})
export class RealEstateHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());
}
