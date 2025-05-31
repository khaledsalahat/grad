import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { AppNavbar } from "@/layout/components/app.navbar";
import { CirclePattern } from "@/layout/components/circlepattern";
import { GenesisLogo } from "@/layout/components/icon/shapes/genesislogo";
import { LayoutService } from "@/layout/service/layout.service";
import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "error",
  standalone: true,
  imports: [
    CommonModule,
    AnimatedContainer,
    AppNavbar,
    GenesisLogo,
    RouterLink,
    CirclePattern,
  ],
  template: `
    <animated-container
      [className]="isWide() ? 'shadow-black-card bg-main-gradient' : 'pt-6'"
    >
      <div class="container">
        <div
          [ngClass]="{
            'min-h-[47rem] lg:h-[84rem] relative': true,
            'rounded-3xl lg:rounded-4xl shadow-black-card bg-main-gradient':
              !isWide(),
          }"
        >
          <div class="relative z-20">
            <app-navbar />
            <div class="mt-8 lg:mt-24 flex flex-col items-center pb-20 px-4">
              <IconShapesGenesisLogo class="w-1/2 sm:w-1/4 lg:w-[396px]" />
              <h1
                class="mt-4 lg:mt-16 text-4xl lg:text-6xl font-semibold title !leading-normal text-center"
              >
                Something gone wrong!
              </h1>
              <p class="mt-4 text-base lg:text-xl text-white/64 text-center">
                The page you were looking for doesn’t exist.
              </p>
              <a routerLink="/" class="button-regular mt-8 px-8">
                Go to home
              </a>
            </div>
          </div>
          <div class="absolute inset-0 overflow-hidden">
            <circle-pattern
              className="w-full lg:w-[82rem] absolute left-1/2 -translate-x-1/2 top-[36rem] lg:top-[calc(100%-30rem)]"
            />
          </div>
        </div>
      </div>
    </animated-container>
  `,
})
export class Error {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());
}
