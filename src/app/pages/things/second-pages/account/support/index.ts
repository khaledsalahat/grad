import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "support",
  standalone: true,
  imports: [CommonModule, IconField, InputIcon, InputTextModule, FormsModule],
  template: `
    <div
      class="p-6 md:p-10 rounded-2.5xl md:rounded-4xl bg-white/16 backdrop-blur-[48px] max-w-[calc(100%-3rem)] lg:max-w-none mx-auto shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
    >
      <h1
        class="text-3xl md:text-5xl font-medium text-surface-0 text-center max-w-lg leading-tight mx-auto"
      >
        Advice and answers from the Genesis Team
      </h1>
      <p class="text-white/64 mt-3.5 text-center">
        Get valuable advice and expert answers directly from the Genesis team.
      </p>
      <div class="mt-8 mx-auto w-full max-w-xs">
        <p-iconfield>
          <p-inputicon class="pi pi-search" />
          <input
            pInputText
            [(ngModel)]="search"
            class="!bg-white/16 !rounded-full outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
            placeholder="Search"
            fluid
          />
        </p-iconfield>
      </div>
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          *ngFor="let item of accountSupportData; let index = index"
          class="px-4 pb-4 pt-3 rounded-2xl md:rounded-4xl bg-white/16 backdrop-blur-[48px] shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
        >
          <div
            class="p-4 flex items-center gap-3 text-surface-0 border-b border-white/24"
          >
            <i [class]="item.icon + ' text-lg'"></i>
            <span class="text-xl font-medium">{{ item.title }}</span>
          </div>
          <ul class="mt-4 p-4 flex flex-col gap-5">
            <li
              *ngFor="let inc of item.includes; let k = index"
              class="text-white/64 flex items-center gap-2"
            >
              <i class="pi pi-info-circle"></i>
              <span>{{ inc }}</span>
            </li>
          </ul>
          <button
            class="mt-4 px-5 py-4 w-full text-surface-0 flex items-center justify-between gap-2 rounded-full bg-white/16 hover:bg-white/20 transition-all backdrop-blur-[48px] shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
          >
            <span class="font-semibold">View all</span>
            <i class="pi pi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class Support {
  search: string = "";

  accountSupportData = [
    {
      title: "Billing",
      icon: "pi pi-money-bill",
      includes: [
        "View your invoices",
        "Update payment methods",
        "Manage billing cycles",
        "Access billing history",
        "Resolve payment issues",
      ],
      to: "",
    },
    {
      title: "Getting Started",
      icon: "pi pi-power-off",
      includes: [
        "Create your first account",
        "Navigate the dashboard",
        "Set up user preferences",
        "Explore key features",
        "Get help with onboarding",
      ],
      to: "",
    },
    {
      title: "Integrations",
      icon: "pi pi-database",
      includes: [
        "Connect third-party apps",
        "Manage API keys",
        "Sync data with tools",
        "Set up webhooks",
        "Resolve integration issues",
      ],
      to: "",
    },
    {
      title: "Transactions",
      icon: "pi pi-arrows-h",
      includes: [
        "Track recent transactions",
        "View transaction history",
        "Dispute a charge",
        "Export transaction data",
        "Filter transactions by date",
      ],
      to: "",
    },
    {
      title: "Security",
      icon: "pi pi-shield",
      includes: [
        "Enable two-factor authentication",
        "Reset your password",
        "Review security logs",
        "Manage authorized devices",
        "Learn about security updates",
      ],
      to: "",
    },
    {
      title: "Profile",
      icon: "pi pi-user",
      includes: [
        "Update your profile info",
        "Change your avatar",
        "Manage email preferences",
        "Set account visibility",
        "Customize notifications",
      ],
      to: "",
    },
  ];
}
