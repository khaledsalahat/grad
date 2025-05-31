import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { CirclePattern } from "@/layout/components/circlepattern";
import { AppNavbar } from "@/layout/components/app.navbar";
import { IconPlay2 } from "@/layout/components/icon/play2";
import { DialogModule } from "primeng/dialog";
import { StaticCustomers } from "@/layout/components/staticcustomers";
import { IconShapesShape2 } from "@/layout/components/icon/shapes/shape2";
import { IconShapesShape3 } from "@/layout/components/icon/shapes/shape3";
import { IconShapesShape4 } from "@/layout/components/icon/shapes/shape4";
import { IconShapesShape5 } from "@/layout/components/icon/shapes/shape5";

@Component({
  selector: "agency-hero",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    CirclePattern,
    AppNavbar,
    IconPlay2,
    DialogModule,
    StaticCustomers,
    IconShapesShape2,
    IconShapesShape3,
    IconShapesShape4,
    IconShapesShape5,
  ],
  template: `
    <animated-container
      [className]="{ 'overflow-hidden': true, 'pt-6': !isWide() }"
    >
      <div
        *ngIf="isWide()"
        class="absolute top-0 inset-x-0 h-[45rem] lg:h-[42rem] shadow-black-card bg-main-gradient overflow-hidden"
      >
        <circle-pattern
          className="absolute -bottom-[115%] -right-[40rem] w-[82rem] lg:block hidden"
        />
      </div>
      <div class="container relative">
        <div
          *ngIf="!isWide()"
          class="absolute top-0 left-4 right-4 h-[45rem] lg:h-[42rem] rounded-3xl lg:rounded-4xl shadow-black-card bg-main-gradient overflow-hidden"
        >
          <circle-pattern
            class="absolute -bottom-[115%] -right-[40rem] w-[82rem] lg:block hidden"
          />
        </div>
        <div class="h-full relative">
          <app-navbar class="relative" />
          <div class="px-6 lg:px-12 mt-10 lg:mt-20 relative z-4">
            <h1
              class="!leading-tight text-white text-4xl lg:text-7xl font-semibold lg:px-3"
            >
              Let&apos;s Shape
              <span
                class="hidden lg:inline-flex w-[25rem] justify-between p-2 border border-white/12 rounded-full"
              >
                <IconShapesShape2 />
                <IconShapesShape3 />
                <IconShapesShape4 />
                <IconShapesShape5 />
              </span>
              Your Distinctive Brand&apos;s Presence
            </h1>
            <p class="mt-5 text-lg text-white/72">
              Optimize your supply chain with our cutting-edge logistics
              solutions, ensuring timely and efficient delivery of your goods
              worldwide.
            </p>

            <div
              class="group flex items-center justify-center h-[32rem] w-full mt-12 lg:mt-10 rounded-4xl relative overflow-hidden shadow-blue-card cursor-pointer"
            >
              <div
                class="absolute inset-0 z-2 bg-[linear-gradient(0deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.06)_100%)]"
              ></div>
              <img
                class="object-cover z-1 absolute w-full h-full"
                src="/pages/agency/hero-video-background.jpg"
                alt="Agency Hero Video Background"
              />
              <button
                class="relative z-3 w-24 h-24 rounded-full bg-white/12 group-hover:bg-white/24 transition-all backdrop-blur-sm border border-white/32 flex items-center justify-center"
                (click)="openDialog()"
              >
                <IconPlay2 />
              </button>
            </div>
            <p-dialog
              [(visible)]="isVisible"
              modal
              header="Video"
              styleClass="lg:w-1/2 sm:w-11/12'"
            >
              <iframe
                class="aspect-video w-full rounded-xl overflow-hidden"
                src="https://www.youtube.com/embed/DHqNzO1kj2o"
                title="Cagatay Civici - PrimeVue | The Next-Gen UI Component Library - Vuejs Amsterdam 2024"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </p-dialog>
          </div>
        </div>
        <static-customers className="mt-16" />
        <h1
          class="mt-12 text-3xl lg:text-5xl font-semibold !leading-tight text-surface-950 dark:text-surface-0"
        >
          &apos;&apos;We are a creative agency focused on transforming ideas
          into impactful brand experiences. Our team specializes in brand
          strategy, design, and digital solutions,
          <span class="text-surface-500 dark:text-white/64"
            >dedicated to helping your brand stand out and connect with your
            audience through innovative and inspiring
            approaches.&apos;&apos;</span
          >
        </h1>
      </div>
    </animated-container>
  `,
  styles: `
    :host ::ng-deep .p-dialog-close-button {
      width: 2rem !important;
      height: 2rem !important;
      border-radius: 0.5rem !important;
    }
  `,
})
export class AgencyHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());

  isVisible: boolean = false;

  openDialog() {
    this.isVisible = true;
  }
}
