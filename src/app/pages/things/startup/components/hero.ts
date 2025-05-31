import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { AppNavbar } from "@/layout/components/app.navbar";
import { CirclePattern } from "@/layout/components/circlepattern";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { FloatingCustomers } from "@/layout/components/floatingcustomers";

@Component({
  selector: "startup-hero",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    CirclePattern,
    AppNavbar,
    FloatingCustomers,
    InputTextModule,
    ButtonModule,
  ],
  template: `
    <animated-container
      [className]="isWide() ? 'bg-main-gradient overflow-hidden' : 'pt-6'"
    >
      <div class="container">
        <div
          [ngClass]="{
            'relative h-[58rem] lg:h-[50rem]': true,
            'bg-main-gradient rounded-3xl lg:rounded-4xl overflow-hidden':
              !isWide(),
          }"
        >
          <div class="relative z-10">
            <app-navbar />
            <div class="lg:mt-24 lg:ml-20 px-6 pt-10 lg:px-0 lg:pt-0">
              <h1
                class="title lg:text-6xl text-3xl max-w-md lg:max-w-xl !leading-tight lg:text-left text-center mx-auto lg:mx-0"
              >
                Your Launchpad to Success in the Startup World
              </h1>
              <p
                class="text-base lg:text-xl text-white/64 mt-6 max-w-[30rem] lg:text-left text-center mx-auto lg:mx-0"
              >
                Join us to transform groundbreaking ideas into reality and drive
                the next wave of innovation.
              </p>
              <div
                class="mt-8 mx-auto lg:mx-0 pl-6 py-2 pr-2 rounded-full bg-white/1 backdrop-blur-lg flex items-center gap-2 max-w-[27rem] border border-white/12"
              >
                <input
                  pInputText
                  type="text"
                  class="h-full !bg-transparent !border-transparent !outline-none !text-surface-0 placeholder:!text-white/64"
                  placeholder="E-mail Address"
                  fluid
                />
                <button
                  pButton
                  class="min-w-32 !px-5 !py-2 !rounded-full !gap-2 !font-medium !text-surface-950 !bg-surface-0 hover:!opacity-80 transition-all shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)]"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div
            class="mt-10 lg:mt-0 w-fit h-auto max-w-none mx-auto lg:mx-0 lg:right-[40px] xl:right-[100px] lg:top-[142px] lg:absolute flex flex-col gap-2 relative z-5"
          >
            <div
              class="w-[340px] h-[89.35px] md:w-[360px] md:h-[95px] lg:w-[449px] lg:h-[118px] relative"
            >
              <div
                class="w-full h-full rounded-[20px] lg:rounded-[24px] bg-white/10 backdrop-blur-3xl absolute top-0 left-0"
              ></div>
              <img
                class="w-full h-auto absolute top-0 left-0"
                src="/pages/startup/hero-img-sec-1.png"
                alt="Hero Image"
              />
            </div>
            <div
              class="w-[340px] h-[89.35px] md:w-[360px] md:h-[95px] lg:w-[449px] lg:h-[118px] relative"
            >
              <div
                class="w-full h-full rounded-[20px] lg:rounded-[24px] bg-white/10 backdrop-blur-3xl absolute top-0 left-0"
              ></div>
              <img
                class="w-full h-auto absolute top-0 left-0"
                src="/pages/startup/hero-img-sec-2.png"
                alt="Hero Image"
              />
            </div>
            <div
              class="w-[340px] h-[89.35px] md:w-[360px] md:h-[95px] lg:w-[449px] lg:h-[118px] relative"
            >
              <div
                class="w-full h-full rounded-[20px] lg:rounded-[24px] bg-white/10 backdrop-blur-3xl absolute top-0 left-0"
              ></div>
              <img
                class="w-full h-auto absolute top-0 left-0"
                src="/pages/startup/hero-img-sec-3.png"
                alt="Hero Image"
              />
            </div>
          </div>

          <floating-customers className="absolute bottom-16" />
          <div class="absolute -right-[42rem] -bottom-[36rem] z-0">
            <circle-pattern className="w-[72rem] lg:w-[80rem] -rotate-45" />
          </div>
        </div>
      </div>
    </animated-container>
  `,
  styles: `
    :host ::ng-deep .p-inputtext {
      box-shadow: none;
    }
  `,
})
export class StartupHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());
}
