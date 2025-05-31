import { QuestionsComments } from "@/layout/components/icon/questionscomments";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AccordionModule } from "primeng/accordion";

@Component({
  selector: "e-learning-faq",
  standalone: true,
  imports: [CommonModule, AccordionModule, AccordionModule, QuestionsComments],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div class="icon-box">
        <IconQuestionsComments className="w-8 h-8 lg:w-10 lg:h-10" />
      </div>
      <h1
        class="mt-10 text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 max-w-2xl !leading-tight text-center mx-auto"
      >
        Classroom Compass Navigating Modern Education
      </h1>
      <p
        class="mt-6 text-lg text-surface-500 dark:text-white/64 max-w-lg mx-auto text-center"
      >
        Explore key educational concepts, from testing to technology, for
        students, teachers, and parents.
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
  `,
  styles: `
    :host ::ng-deep .p-accordioncontent-content {
      @apply dark:bg-surface-950;
    }
  `,
})
export class ELearningFAQ {
  faqData = [
    {
      title: "What is the purpose of standardized testing?",
      content:
        "To assess student performance across schools and districts uniformly.",
    },
    {
      title: "How does project-based learning benefit students?",
      content:
        "Project-based learning encourages critical thinking, collaboration, and problem-solving, helping students apply theoretical knowledge to real-world situations.",
    },
    {
      title: "What is the importance of early childhood education?",
      content:
        "Early childhood education lays the foundation for lifelong learning and development, helping children acquire basic cognitive, social, and emotional skills.",
    },
    {
      title: "How can technology enhance classroom learning?",
      content:
        "Technology can personalize learning, increase engagement, and provide access to a wide range of educational resources, making learning more interactive and effective.",
    },
  ];
}
