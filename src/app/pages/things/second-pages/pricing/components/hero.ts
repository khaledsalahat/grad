import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { AppNavbar } from "@/layout/components/app.navbar";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { FormsModule } from "@angular/forms";
import { StaticCustomers } from "@/layout/components/staticcustomers";

@Component({
  selector: "pricing-hero",
  standalone: true,
  imports: [
    AnimatedContainer,
    CommonModule,
    AppNavbar,
    ToggleSwitchModule,
    FormsModule,
    StaticCustomers,
  ],
  template: `<div>
    <div [class]="isWide() ? 'bg-main-gradient shadow-black-card' : 'pt-6'">
      <div class="container">
        <div
          [class]="
            isWide()
              ? ''
              : 'rounded-3xl lg:rounded-4xl bg-main-gradient shadow-black-card'
          "
        >
          <app-navbar />
          <div
            class="mt-18 pb-16 max-w-[calc(100%-3rem)] mx-auto lg:max-w-none"
          >
            <h1
              class="title text-4xl lg:text-6xl text-center mx-auto !leading-tight"
            >
              Comprehensive
              <br />
              Pricing and Fee Structures
            </h1>
            <p class="description max-w-2xl text-center mx-auto mt-6">
              Our comprehensive pricing and fee structures offer a detailed
              breakdown of costs, ensuring transparency and clarity for our
              customers.
            </p>
            <div
              class="flex items-center justify-center gap-6 w-fit mx-auto mt-10 select-none"
            >
              <span class="text-xl font-medium text-white/64">Monthly</span>
              <p-toggleswitch
                [(ngModel)]="isYearly"
                styleClass="!w-16 !h-8"
                class="inline-flex"
              />
              <span class="text-xl font-medium text-white/64">Yearly</span>
            </div>
            <div
              class="mt-24 lg:mt-16 flex lg:flex-row flex-col max-w-xl lg:max-w-[calc(100%-12rem)] mx-auto lg:gap-0 gap-16 lg:divide-x divide-white/12 divide-dashed"
            >
              <animated-container
                *ngFor="let item of pricingData; let index = index"
                [delay]="index * 100"
                className="lg:p-6 flex-1"
              >
                <div
                  class="flex flex-col gap-8 pb-8 border-b border-white/12 border-dashed"
                >
                  <div
                    class="w-fit min-w-8 py-1 px-4 bg-white/16 backdrop-blur-[48px] border border-white/8 rounded-full flex items-center justify-center shadow-[0px-2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                  >
                    <span class="title text-base font-medium">{{
                      item.badge
                    }}</span>
                  </div>
                  <div class="inline-flex items-end gap-3">
                    <span class="title text-6xl font-semibold">{{
                      item.price[isYearly ? "yearly" : "monthly"]
                    }}</span>
                    <span class="py-2 text-2xl text-white/64"
                      >/ {{ isYearly ? "Yearly" : "Monthly" }}</span
                    >
                  </div>
                  <p class="text-lg text-white/64">{{ item.description }}</p>
                  <button class="button-regular">Get Started</button>
                </div>
                <div class="mt-8 flex flex-col gap-3">
                  <div
                    *ngFor="let inc of item.includes; let j = index"
                    class="flex items-center gap-3 text-white/64"
                  >
                    <i class="pi pi-check !text-base"></i>
                    <span class="text-lg">{{ inc }}</span>
                  </div>
                </div>
              </animated-container>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <static-customers className="mt-16" />
    </div>
  </div>`,
  styles: `
    :host ::ng-deep {
      .p-toggleswitch-slider {
        background-color: rgba(255, 255, 255, 0.16) !important;
      }

      .p-toggleswitch-handle {
        @apply top-[40%] !w-[21px] !h-[calc(100%-0.5rem)] !bg-white !backdrop-blur-[48px] !border-white/8 shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)];
      }

      --p-toggleswitch-width: 3.5rem;
    }
  `,
})
export class PricingHero {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());

  isYearly: boolean = false;

  pricingData = [
    {
      badge: "Pro",
      price: {
        monthly: "$64",
        yearly: "$128",
      },
      description:
        "Elevate your experience with our Pro package, unlocking advanced features and enhanced performance",
      includes: [
        "Simple Budget Management",
        "Fund Transfers",
        "Limited Support",
        "Real-Time Alerts",
      ],
    },
    {
      badge: "Premium",
      price: {
        monthly: "$130",
        yearly: "$260",
      },
      description:
        "Experience ultimate luxury and exclusivity with our Premium package, offering unmatched benefits.",
      includes: [
        "Simple Budget Management",
        "Fund Transfers",
        "All Pro Features",
        "Higher Transaction Limits",
        "Advanced Investment Tools",
        "Rewards Program",
      ],
    },
    {
      badge: "Team",
      price: {
        monthly: "$320",
        yearly: "$640",
      },
      description:
        "It features advanced tools, user accounts and collaborative planning for secure, efficient financial management.",
      includes: [
        "Simple Budget Management",
        "Fund Transfers",
        "All Premium Features",
        "Multiple User Accounts",
        "Team Management Tools",
        "Advanced Security Features",
        "Dedicated Support Team",
        "Custom Account Settings",
      ],
    },
  ];
}
