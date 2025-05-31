import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { AccordionModule } from "primeng/accordion";
import { QuestionsComments } from "@/layout/components/icon/questionscomments";
import { CommonModule } from "@angular/common";

@Component({
  selector: "startup-faq",
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    AnimatedContainer,
    QuestionsComments,
  ],
  template: `
    <div class="container lg:max-w-[82rem] max-w-[28rem] mt-24 lg:mt-64">
      <div class="flex lg:flex-row flex-col items-start gap-16">
        <div class="flex-1">
          <div class="icon-box ml-0">
            <IconQuestionsComments className="w-9 h-9 lg:w-11 lg:h-11" />
          </div>
          <h1
            class="mt-10 text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 !leading-tight"
          >
            Frequently <br />
            Asked Questions
          </h1>
          <p class="text-xl max-w-sm text-surface-500 dark:text-white/64 mt-6">
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
              <p-accordion-header
                class="!py-6 !bg-surface-0 dark:!bg-surface-950"
              >
                <h3
                  class="text-xl font-semibold text-surface-950 dark:text-surface-0 flex-1"
                >
                  {{ item.title }}
                </h3>
              </p-accordion-header>
              <p-accordion-content>
                <p
                  class="pb-6 text-lg font-medium text-surface-500 dark:text-white/64"
                >
                  {{ item.content }}
                </p>
              </p-accordion-content>
            </p-accordion-panel>
          </p-accordion>
        </div>
        <animated-container
          enterClass="animate-slidefadeinright"
          className="relative w-full lg:flex-1 rounded-4xl bg-main-gradient shadow-blue-card h-[33rem] lg:h-[51rem]"
        >
          <img
            class="absolute w-full h-full"
            src="/pages/startup/question-line.svg"
            alt="Question Line"
          />
          <img
            class="absolute w-28 lg:w-44 bottom-10 lg:bottom-4 right-10 lg:right-20"
            src="/pages/startup/question-mark.png"
            alt="Question Mark"
          />
          <img
            class="absolute w-20 lg:w-24 top-[200px] lg:top-[332px] right-[15px] lg:right-[94px]"
            src="/pages/startup/question-mark.png"
            alt="Question Mark"
          />
          <img
            class="absolute w-24 lg:w-32 top-[20px] lg:top-[40px] right-[40px] lg:right-[116px]"
            src="/pages/startup/question-mark.png"
            alt="Question Mark"
          />
          <img
            class="absolute w-16 lg:w-20 top-[60px] lg:top-[109px] left-[90px] lg:left-[162px]"
            src="/pages/startup/question-mark.png"
            alt="Question Mark"
          />
          <img
            class="absolute w-20 lg:w-24 top-[240px] lg:top-[258px] left-[40px] lg:left-[64px]"
            src="/pages/startup/question-mark.png"
            alt="Question Mark"
          />
          <img
            class="absolute w-24 lg:w-36 top-[340px] lg:top-[420px] left-[80px]"
            src="/pages/startup/question-mark.png"
            alt="Question Mark"
          />
        </animated-container>
      </div>
    </div>
  `,
  styles: `
    :host ::ng-deep .p-accordioncontent-content {
      @apply dark:bg-surface-950;
    }
  `,
})
export class StartupFaq {
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
