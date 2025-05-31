import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccordionModule } from "primeng/accordion";

@Component({
  selector: "agency-faq",
  standalone: true,
  imports: [CommonModule, AccordionModule],
  template: ` <div class="container mt-24 lg:mt-64">
    <span class="text-xl font-semibold text-surface-950 dark:text-surface-0"
      >FAQ</span
    >
    <h1
      class="mt-2 text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0"
    >
      Navigating the Future of Creativity
    </h1>
    <p-accordion
      class="mt-14 flex flex-col gap-4"
      expandIcon="pi pi-plus"
      collapseIcon="pi pi-minus"
    >
      <p-accordionpanel
        *ngFor="let item of agencyFAQData; let index = index"
        [value]="index"
        class="rounded-3xl px-6 overflow-hidden shadow-stroke dark:shadow-none !border-0 dark:!border dark:border-white/12"
      >
        <p-accordionheader class="!py-6 !bg-surface-0 dark:!bg-surface-950">
          <h3
            class="text-xl font-semibold text-surface-950 dark:text-surface-0 flex-1"
          >
            {{ item.title }}
          </h3>
        </p-accordionheader>
        <p-accordioncontent>
          <p
            class="pb-6 text-lg font-medium text-surface-500 dark:text-white/64"
          >
            {{ item.content }}
          </p>
        </p-accordioncontent>
      </p-accordionpanel>
    </p-accordion>
  </div>`,
  styles: `
    :host ::ng-deep .p-accordioncontent-content {
      @apply dark:bg-surface-950;
    }
  `,
})
export class AgencyFAQ {
  agencyFAQData = [
    {
      title: "What services does your agency offer?",
      content:
        "We offer a range of services including brand strategy, web design and development, mobile app creation, digital marketing, and creative content production.",
    },
    {
      title: "How do you approach a new project?",
      content:
        "We start every project with an in-depth consultation to understand your goals, target audience, and brand vision. Then, we develop a customized plan that aligns with your objectives, ensuring each step is tailored to your specific needs.",
    },
    {
      title: "What is your typical project timeline?",
      content:
        "The timeline depends on the scope of the project. On average, web development projects take 6-8 weeks, while mobile apps can take 3-6 months. We provide detailed timelines after reviewing the project requirements.",
    },
    {
      title: "Can you work with clients from different industries?",
      content:
        "Absolutely! We have experience working with clients across various industries, including healthcare, e-commerce, education, finance, and more. Our approach is adaptable to meet the unique needs of each sector.",
    },
  ];
}
