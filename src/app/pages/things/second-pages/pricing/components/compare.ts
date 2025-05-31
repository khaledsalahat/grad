import { Component } from "@angular/core";

import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";

type PricingPlansType = "basic" | "pro" | "premium";

@Component({
  selector: "pricing-compare",
  standalone: true,
  imports: [AnimatedContainer, CommonModule],
  template: ` <div class="container mt-16">
    <div
      class="rounded-3xl lg:rounded-4xl bg-main-gradient-to-top overflow-hidden relative p-6 lg:p-7 shadow-black-card"
    >
      <div
        class="lg:flex hidden items-center bg-white/16 rounded-full border border-white/8 backdrop-blur-[48px] shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
      >
        <div class="w-[27%] px-8 py-4">
          <span class="text-xl font-medium title">Plan</span>
        </div>
        <div class="w-[63%] flex items-center">
          <div
            *ngFor="let item of pricingPlans; let index = index"
            class="flex-1 flex items-center justify-center px-6 py-4"
          >
            <span class="capitalize title text-xl font-medium">{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <animated-container
          *ngFor="let item of comparingTitles; let index = index"
          [delay]="index * 200"
          [className]="{
            'flex lg:flex-row flex-col lg:border-b border-white/12 border-dashed': true,
            'border-none': index === comparingTitles.length - 1,
          }"
        >
          <div
            class="lg:w-[27%] lg:text-left text-center lg:px-8 px-4 py-4 rounded-full bg-white/16 lg:bg-transparent lg:shadow-none backdrop-blur-[48px] lg:backdrop-blur-none shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
          >
            <span class="text-xl font-normal title">{{ item }}</span>
          </div>

          <div class="flex items-center lg:hidden border-b border-white/12">
            <div
              *ngFor="let item of pricingPlans; let j = index"
              class="flex-1 flex items-center justify-center px-6 py-4"
            >
              <span class="capitalize title text-xl font-normal">{{
                item
              }}</span>
            </div>
          </div>
          <div class="lg:w-[63%] flex items-center">
            <div
              *ngFor="let item of pricingPlans; let j = index"
              class="flex-1 flex items-center justify-center px-6 py-4"
            >
              <span class="capitalize title text-xl font-normal">
                @if (pricingCompareData[item][index] === "yes") {
                  <i class="pi pi-check text-sm"></i>
                } @else if (pricingCompareData[item][index] === "no") {
                  <i class="pi pi-minus text-sm opacity-60"></i>
                } @else {
                  {{ pricingCompareData[item][index] }}
                }
              </span>
            </div>
          </div>
        </animated-container>
      </div>
    </div>
  </div>`,
})
export class PricingCompare {
  pricingPlans: PricingPlansType[] = ["basic", "pro", "premium"];

  comparingTitles = [
    "3 Active Members",
    "Up to 10 Components",
    "High Request Limits",
    "Unlimited Access",
    "Advanced Analytics",
    "Data Export",
    "Prioritized Support",
    "Real-time Updates",
    "Batch Requests",
    "Webhooks",
  ];

  pricingCompareData = {
    basic: ["$24", "10", "10", "yes", "yes", "no", "no", "no", "no", "no"],
    pro: [
      "$64",
      "Unlimited",
      "20",
      "yes",
      "yes",
      "yes",
      "yes",
      "no",
      "no",
      "no",
    ],
    premium: [
      "$130",
      "Unlimited",
      "Unlimited",
      "yes",
      "yes",
      "yes",
      "yes",
      "yes",
      "yes",
      "yes",
    ],
  };
}
