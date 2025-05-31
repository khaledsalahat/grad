import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { AppNavbar } from "@/layout/components/app.navbar";
// import { Selector } from "./destination/selector";
// import { FloatingCustomers } from "@/layout/components/floatingcustomers";

@Component({
  selector: "travel-hero",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    AppNavbar,
    // Selector,
    // FloatingCustomers,
  ],
  template: `
    <animated-container [className]="isWide() ? 'overflow-hidden' : 'pt-6'">
      <div
        *ngIf="isWide()"
        class="h-[52rem] absolute top-0 left-0 w-full overflow-hidden"
      >
        <img
          class="object-cover min-w-96 absolute top-0 bottom-0 right-0 left-0 w-full h-full"
          src="/pages/travel/elya/elya5.jpg"
          alt="Travel Hero Background img"
        />
        <div
          class="absolute inset-0 z-1 opacity-75 bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_49.65%,rgba(0,0,0,0.00)_100%)]"
        ></div>
        <div
          class="absolute lg:opacity-100 opacity-50 z-10 bottom-0 inset-x-0 h-[22rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_62.59%,#FFF_100%)] dark:bg-[linear-gradient(180deg,rgba(9,9,11,0.00)_0%,rgba(9,9,11,0.8)_62.59%,rgba(9,9,11,1)_100%)] lg:backdrop-blur-[0.75px]"
        ></div>
      </div>

      <div class="container">
        <div
          [ngClass]="{
            'relative rounded-b-md rounded-t-3xl lg:rounded-t-4xl h-[52rem]': true,
            'overflow-hidden': !isWide(),
          }"
        >
          <div class="absolute inset-0 overflow-y-clip">
            <ng-container *ngIf="!isWide()">
              <img
                class="object-cover min-w-96 absolute top-0 bottom-0 right-0 left-0 w-full h-full"
                src="/pages/travel/travel-hero-bg.jpg"
                alt="Travel Hero Background img"
              />
              <div
                class="absolute inset-0 z-1 opacity-50 bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_49.65%,rgba(0,0,0,0.00)_100%)]"
              ></div>
              <div
                class="absolute lg:opacity-100 opacity-50 z-10 bottom-0 inset-x-0 h-[22rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_62.59%,#FFF_100%)] dark:bg-[linear-gradient(180deg,rgba(9,9,11,0.00)_0%,rgba(9,9,11,0.8)_62.59%,rgba(9,9,11,1)_100%)] lg:backdrop-blur-[0.75px]"
              ></div>
            </ng-container>

            <!-- <img
              class="z-2 min-w-[520px] w-full h-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              width="0"
              height="0"
              src="/pages/travel/cloud-1.png"
              alt="Travel Hero Cloud img"
            /> -->
            <!-- <img
              class="z-2 w-[392px] min-w-[520px] h-auto absolute -top-24 -left-60 animate-cloud-idle animation-delay-2000"
              width="0"
              height="0"
              src="/pages/travel/cloud-2.png"
              alt="Travel Hero Cloud img"
            /> -->
            <!-- <img
              class="z-2 w-[760px] min-w-[520px] h-auto absolute bottom-80 -right-96 animate-cloud-idle"
              width="0"
              height="0"
              src="/pages/travel/cloud-3.png"
              alt="Travel Hero Cloud img"
            /> -->
            <!-- <img
              class="z-2 w-[1272px] min-w-[520px] h-auto absolute bottom-0 lg:-bottom-52 -left-20 animate-cloud-idle animation-delay-1200"
              width="0"
              height="0"
              src="/pages/travel/cloud-4.png"
              alt="Travel Hero Cloud img"
            /> -->
            <!-- <img
              class="z-5 w-[1272px] min-w-[600px] h-auto absolute bottom-40 lg:bottom-24 left-0 lg:left-20 rotate-[10deg]"
              width="0"
              height="0"
              src="/pages/travel/airplane.png"
              alt="Travel Hero Airplane img"
            /> -->
            <!-- <img
              class="z-4 w-[1512px] min-w-[520px] h-auto absolute top-0 lg:top-24 -left-[782px] animate-cloud-idle animation-delay-1200"
              width="0"
              height="0"
              src="/pages/travel/cloud-5.png"
              alt="Travel Hero Cloud img"
            /> -->
            <!-- <img
              class="z-6 w-[1512px] min-w-[520px] h-auto absolute top-[460px] lg:top-60 left-[-200px] lg:-left-[400px] animate-cloud-idle animation-delay-2000"
              width="0"
              height="0"
              src="/pages/travel/cloud-5.png"
              alt="Travel Hero Cloud img"
            /> -->
            <!-- <img
              class="z-6 w-[1512px] min-w-[520px] h-auto absolute top-[480px] lg:top-40 left-[80px] lg:left-[160px] animate-cloud-idle animation-delay-200"
              width="0"
              height="0"
              src="/pages/travel/cloud-5.png"
              alt="Travel Hero Cloud img"
            /> -->

            <div
              class="absolute left-1/2 -translate-x-1/2 top-64 z-3 flex flex-col items-center"
            >
              <div
                class="title bg-[linear-gradient(180deg,#FFF_-16.99%,rgba(255,255,255,0.00)_100%)] text-8xl lg:text-[17rem] leading-none lg:-mt-14"
              >
                booking
              </div>
            </div>
          </div>
          <app-navbar />
        </div>
        <!-- <travel-destination-selector /> -->
        <!-- <floating-customers
          className="mt-24 pb-24"
          labelClass="text-surface-500 dark:text-white/64"
          iconClass="[&_path]:fill-surface-500 dark:[&_path]:fill-white/64"
        /> -->
      </div>
    </animated-container>
  `,
})
export class TravelHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());
}
