import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AccordionModule } from "primeng/accordion";
@Component({
  selector: "logistic-faq",
  standalone: true,
  imports: [CommonModule, AccordionModule],
  template: `
    <div class="container mt-64 flex md:flex-row flex-col gap-16">
      <div class="flex-1">
        <span class="badge">FAQ</span>
        <h1
          class="text-3xl lg:text-5xl text-surface-950 dark:text-surface-0 font-semibold mt-4 max-w-xl leading-snug"
        >
          Frequently Asked Questions
        </h1>
        <p
          class="text-xl text-surface-500 dark:text-white/64 mt-6 max-w-[27rem]"
        >
          Find quick answers to common questions about our SaaS platform.
        </p>
        <p-accordion
          class="mt-14 flex flex-col gap-4"
          expandIcon="pi pi-plus"
          collapseIcon="pi pi-minus"
        >
          <p-accordionpanel
            *ngFor="let item of logisticFAQ; let index = index"
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
      </div>
      <div
        class="w-full md:flex-1 h-[30rem] md:h-[50rem] rounded-4xl overflow-hidden relative shadow-blue-card"
      >
        <img
          class="object-cover -z-2 object-right absolute w-full h-full"
          src="/pages/logistic/faq-image.jpg"
          alt="Logistic FAQ Image"
        />
        <div
          class="-z-1 absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
        ></div>
      </div>
    </div>
  `,
  styles: `
    :host ::ng-deep .p-accordioncontent-content {
      @apply dark:bg-surface-950;
    }
  `,
})
export class LogisticFAQ {
  logisticFAQ = [
    {
      title: "What services does your logistics company offer?",
      content:
        "We offer a wide range of services including global transportation solutions, customs clearance, supply chain management, and last-mile delivery. Our services are tailored to meet the needs of different industries.",
    },
    {
      title: "How do you ensure the security of my goods?",
      content:
        "We utilize advanced tracking systems, secure warehouses, and trusted carriers to ensure that your goods are always safe. Our teams monitor shipments 24/7, and we have comprehensive insurance options for added protection.",
    },
    {
      title: "What are your warehousing capabilities?",
      content:
        "Our warehouses are equipped with state-of-the-art technology, offering temperature-controlled storage, inventory management, and real-time monitoring. We have the capacity to handle large volumes and various types of goods.",
    },
    {
      title: "Do you provide customized logistics solutions?",
      content:
        "Yes, we specialize in creating customized logistics solutions to meet your unique business requirements. From tailored shipping routes to specialized handling of sensitive goods, we work closely with you to optimize your supply chain.",
    },
  ];
}
