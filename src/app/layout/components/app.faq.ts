import { Component, Input } from "@angular/core";
import { twMerge } from "tailwind-merge";
import { AccordionModule } from "primeng/accordion";
import { QuestionsComments } from "./icon/questionscomments";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-faq",
  standalone: true,
  imports: [CommonModule, AccordionModule, QuestionsComments],
  template: `
    <div [class]="twMerge('max-w-[58rem] px-4 mx-auto', className)">
      <div class="icon-box">
        <IconQuestionsComments className="w-9 h-9 lg:w-11 lg:h-11" />
      </div>
      <h1
        class="mt-10 text-center text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 leading-tight"
      >
        Frequently <br />
        Asked Questions
      </h1>
      <p class="text-xl text-center text-surface-500 dark:text-white/64 mt-6">
        Find quick answers to common questions about our SaaS platform.
      </p>
      <p-accordion
        class="mt-14 flex flex-col gap-4"
        expandIcon="pi pi-plus"
        collapseIcon="pi pi-minus"
      >
        <p-accordion-panel
          *ngFor="let item of faqData; let index = index"
          [value]="index"
          class="rounded-3xl px-6 overflow-hidden shadow-stroke dark:shadow-none !border-0 dark:!border dark:border-white/12"
        >
          <p-accordion-header class="!py-6 !bg-surface-0 dark:!bg-surface-950">
            <h3
              class="text-xl font-semibold text-surface-950 dark:text-surface-0 flex-1"
            >
              {{ item.title }}
            </h3>
          </p-accordion-header>
          <p-accordion-content :pt="{ content: 'dark:!bg-surface-950' }">
            <p
              class="pb-6 text-lg font-medium text-surface-500 dark:text-white/64"
            >
              {{ item.content }}
            </p>
          </p-accordion-content>
        </p-accordion-panel>
      </p-accordion>
    </div>
  `,
  styles: `
    :host ::ng-deep .p-accordioncontent-content {
      @apply dark:bg-surface-950;
    }
  `,
})
export class AppFAQ {
  twMerge = twMerge;

  @Input() className: any = "";

  faqData = [
    {
      title: "What features does your SaaS platform offer?",
      content:
        "Our platform offers a wide range of features including real-time collaboration, comprehensive dashboards, automated workflows, and robust security measures.",
    },
    {
      title: "How secure is my data on your platform?",
      content:
        "We prioritize data security by implementing end-to-end encryption, regular security audits, and strict access controls. Your data is stored in secure, compliant data centers.",
    },
    {
      title: "Can I integrate your platform with other tools we use?",
      content:
        "Yes, our platform supports integrations with various third-party applications through APIs and native connectors, allowing you to streamline your workflows and enhance productivity.",
    },
    {
      title: "Do you offer customer support?",
      content:
        "Absolutely! We provide 24/7 customer support through multiple channels, including live chat, email, and phone. Our dedicated support team is here to assist you whenever you need help.",
    },
  ];
}
