import { IconMasterCard } from "@/layout/components/icon/mastercard";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "subscription-billing",
  standalone: true,
  imports: [CommonModule, IconMasterCard],
  template: `
    <div
      class="p-6 md:p-12 flex flex-col gap-10 rounded-2.5xl md:rounded-4xl bg-white/16 backdrop-blur-[48px] max-w-[calc(100%-3rem)] lg:max-w-none mx-auto shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
    >
      <div
        class="flex md:flex-row flex-col items-start gap-8 pb-8 border-b border-white/12"
      >
        <div class="w-full md:flex-[0.45] text-lg font-medium text-surface-0">
          Subscription Plan
        </div>
        <div class="w-full md:flex-[0.55] flex gap-2 items-start">
          <div class="text-surface-0 flex-1">Pro Plan</div>
          <button class="button-blur h-auto py-1 px-3 text-sm">
            Change Plan
          </button>
        </div>
      </div>
      <div
        class="flex md:flex-row flex-col items-start gap-8 pb-8 border-b border-white/12"
      >
        <div class="w-full md:flex-[0.45] text-lg font-medium text-surface-0">
          Payment Methods
        </div>
        <div class="w-full md:flex-[0.55] flex flex-col items-end">
          <div class="w-full flex gap-2 items-start">
            <div class="text-surface-0 flex-1">Master Card ** 1089</div>
            <IconMasterCard />
          </div>
          <button class="mt-4 button-blur h-auto py-1 px-3 text-sm">
            Change Methods
          </button>
        </div>
      </div>
      <div class="flex md:flex-row flex-col items-start gap-8 pb-8">
        <div class="w-full md:flex-[0.45] text-lg font-medium text-surface-0">
          Billing History
        </div>
        <div class="w-full md:flex-[0.55] flex flex-col gap-4">
          <div
            *ngFor="let i of [1, 2, 3, 4, 5]"
            class="flex flex-wrap gap-2 items-start justify-between"
          >
            <div class="text-surface-0">03/05/2025 - payment.pdf</div>
            <button class="button-blur h-auto py-1 px-3 text-sm">
              Download
              <i class="pi pi-cloud-download leading-none !text-base"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SubscriptionBilling {}
