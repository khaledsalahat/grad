import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { CirclePattern } from "@/layout/components/circlepattern";
import { FloatingCustomers } from "@/layout/components/floatingcustomers";
import { AppNavbar } from "@/layout/components/app.navbar";

@Component({
  selector: "enterprise-hero",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    FloatingCustomers,
    CirclePattern,
    AppNavbar,
  ],
  template: `
    <animated-container
      [className]="{
        'bg-main-gradient shadow-black-card overflow-hidden': isWide(),
        'pt-6': !isWide(),
      }"
    >
      <div class="container">
        <div
          [ngClass]="{
            'relative h-[58rem] lg:h-[52rem]': true,
            'rounded-3xl overflow-hidden lg:rounded-4xl bg-main-gradient shadow-black-card':
              !isWide(),
          }"
        >
          <app-navbar />
          <div class="px-6 mt-10 lg:mt-24 lg:ml-28 relative z-10">
            <h1
              class="title text-4xl lg:text-left text-center lg:text-6xl max-w-lg mx-auto lg:mx-0 !leading-tight"
            >
              Your Key to Success in the Corporate World
            </h1>
            <p
              class="mt-6 text-base lg:text-xl text-white/64 max-w-md mx-auto lg:mx-0 lg:text-left text-center"
            >
              Join us to transform groundbreaking ideas into reality and lead
              the next wave of innovation.
            </p>
            <div
              class="flex lg:justify-start justify-center max-w-lg mx-auto lg:mx-0 items-center mt-8 gap-3"
            >
              <button class="button-regular lg:min-w-36">Get Started</button>
              <button class="button-outlined lg:min-w-36">Explore</button>
            </div>
          </div>
          <div class="absolute bottom-6 lg:bottom-20 inset-x-0">
            <floating-customers />
          </div>
          <div
            class="top-[40rem] lg:top-[30rem] -left-[45rem] lg:-left-[60rem] absolute"
          >
            <circle-pattern className="w-[60rem] lg:w-[80rem]" />
          </div>
          <div
            class="top-[40rem] lg:top-[32rem] -right-[45rem] lg:-right-[60rem] absolute"
          >
            <circle-pattern className="w-[60rem] lg:w-[80rem]" />
          </div>
          <img
            class="w-[359px] mt-6 lg:mt-0 mx-auto lg:mx-0 h-auto lg:absolute top-[145px] right-[132px] rounded-2xl shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
            src="/pages/enterprise/hero-img-1.png"
            alt="Hero Image"
          />

          <div
            class="w-[300px] -mt-16 lg:mt-0 mx-auto lg:mx-0 h-auto relative lg:absolute lg:top-[406px] lg:right-[243px]"
          >
            <div
              class="w-full h-[102.44px] bg-white/12 backdrop-blur-[32px] absolute top-0 left-0 rounded-[20px]"
            ></div>
            <img
              class="w-full max-w-none h-auto absolute top-0 left-0 rounded-2xl shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
              src="/pages/enterprise/hero-img-2.png"
              alt="Hero Image"
            />
          </div>
        </div>
      </div>
    </animated-container>
  `,
})
export class EnterpriseHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());
}
