import { Component } from "@angular/core";
import { RealEstateBestProjects } from "./bestprojects";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";

@Component({
  selector: "real-estate-workflow",
  standalone: true,
  imports: [AnimatedContainer, CommonModule],
  template: `
    <div class="container flex lg:flex-row flex-col gap-18 mt-24 lg:mt-64">
      <animated-container
        enterClass="animate-slidefadeinleft"
        className="w-full lg:flex-1 h-[30rem] lg:h-[49rem] rounded-4xl overflow-hidden shadow-blue-card relative"
      >
        <div
          class="absolute -z-1 inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]"
        ></div>
        <img
          class="object-cover -z-2 absolute w-full h-full"
          src="/pages/real-estate/workflow-image.jpg"
          alt="Real Estate Workflow Image"
        />
      </animated-container>
      <div class="flex-1">
        <span class="badge">Construction</span>
        <h1
          class="text-3xl lg:text-5xl mt-4 font-semibold text-surface-950 dark:text-surface-0"
        >
          Our Project Workflow
        </h1>
        <p class="text-lg text-surface-500 dark:text-white/64 mt-5">
          Our streamlined project workflow ensures that every detail is
          meticulously planned and executed, from initial concept to final
          construction. Here’s how we turn your vision into reality
        </p>
        <ul class="flex flex-col gap-8 mt-14">
          <animated-container
            *ngFor="let item of realEstateWorkflowData; let index = index"
            [delay]="index * 200"
          >
            <li class="flex flex-col gap-4">
              <h6
                class="text-2xl font-medium text-surface-950 dark:text-surface-0"
              >
                {{ item.title }}
              </h6>
              <p class="text-lg text-surface-500 dark:text-white/64">
                {{ item.description }}
              </p>
            </li>
          </animated-container>
        </ul>
      </div>
    </div>
  `,
})
export class RealEstateWorkflow {
  realEstateWorkflowData = [
    {
      title: "Define the Problem",
      description:
        "Learn about the culture, climate, and attractions through guides, forums, and blogs.",
    },
    {
      title: "Develop the Solution",
      description:
        "Once the problem is defined, our team creates a detailed plan and design, presenting innovative solutions.",
    },
    {
      title: "Concept Revision",
      description:
        "After the initial design, we review the concept with the client, making necessary adjustments to meet their expectations.",
    },
    {
      title: "Finalize and Build",
      description:
        "Upon approval, we proceed to finalize the design and begin the construction process, ensuring every detail is executed perfectly.",
    },
  ];
}
