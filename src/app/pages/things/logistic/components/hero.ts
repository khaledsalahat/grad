import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { AppNavbar } from "@/layout/components/app.navbar";
import { FloatingCustomers } from "@/layout/components/floatingcustomers";
import { RouterLink } from "@angular/router";

@Component({
  selector: "logistic-hero",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    AppNavbar,
    FloatingCustomers,
    RouterLink,
  ],
  template: `
    <animated-container
      [className]="isWide() ? 'h-[50rem] lg:h-[44rem] relative' : 'pt-6'"
    >
      <ng-container *ngIf="isWide()">
        <img
          class="w-full h-full object-cover absolute inset-0 -z-2"
          src="/pages/logistic/hero-background.jpg"
          alt="Logistic Hero Background Image"
        />
        <div
          class="absolute inset-0 -z-1 bg-[linear-gradient(106deg,rgba(0,0,0,0.36)_0.48%,rgba(0,0,0,0.10)_100%)]"
        ></div>
      </ng-container>

      <div class="container">
        <div
          class="h-[50rem] lg:h-[44rem] relative overflow-hidden rounded-3xl lg:rounded-4xl shadow-black-card flex flex-col"
        >
          <ng-container *ngIf="!isWide()">
            <img
              class="w-full h-full object-cover absolute inset-0 -z-2"
              src="/pages/logistic/hero-background.jpg"
              alt="Logistic Hero Background Image"
            />
            <div
              class="absolute inset-0 -z-1 bg-[linear-gradient(106deg,rgba(0,0,0,0.36)_0.48%,rgba(0,0,0,0.10)_100%)]"
            ></div>
          </ng-container>

          <app-navbar />
          <div class="flex-1 flex flex-col justify-between pb-16">
            <div class="mt-10 lg:mt-20 lg:ml-20 px-6 lg:px-0">
              <h1 class="title text-4xl lg:text-7xl max-w-2xl !leading-tight">
                Streamline Your Logistics Operations
              </h1>
              <p
                class="mt-6 description max-w-[40rem] text-white/72 lg:text-base text-lg"
              >
                Optimize your supply chain with our cutting-edge logistics
                solutions, ensuring timely and efficient delivery of your goods
                worldwide.
              </p>
              <div class="mt-8 flex items-center gap-3">
                <a routerLink="" class="button-regular"> Get Started </a>
                <a routerLink="" class="button-outlined"> Explore </a>
              </div>
            </div>
            <floating-customers class="mt-auto mb-0" />
          </div>
        </div>
      </div>
    </animated-container>
  `,
})
export class LogisticHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());
}
