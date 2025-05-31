import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { FileFade } from "@/layout/components/icon/filefade";

@Component({
  selector: "enterprise-interaction",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, FileFade],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div class="icon-box">
        <IconFileFade className="w-8 h-8 lg:w-10 lg:h-10" />
      </div>
      <h1
        class="text-3xl lg:text-5xl text-surface-950 dark:text-surface-0 font-semibold max-w-xs lg:max-w-md text-center mx-auto mt-10"
      >
        Enhancing Customer Interaction
      </h1>
      <p
        class="mt-6 mx-auto max-w-lg text-center text-lg lg:text-xl text-surface-500 dark:text-white/64"
      >
        Discover how modern businesses are optimizing their processes with
        technology.
      </p>
      <div
        class="mt-16 flex lg:flex-row flex-col items-center lg:items-start gap-6"
      >
        <animated-container
          *ngFor="let item of enterpriseInteractionData; let index = index"
          [delay]="index * 400"
          className="flex-1 max-w-[26rem]"
        >
          <div
            class="h-[24.5rem] relative w-full bg-main-gradient rounded-3xl lg:rounded-4xl shadow-blue-card"
          >
            <img
              class="absolute w-[85%] h-auto left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              [src]="item.image"
              alt="Interaction Image"
            />
          </div>
          <div class="p-6 mt-4">
            <a
              class="flex items-center gap-2 text-surface-950 dark:text-surface-0"
            >
              <span class="text-xl font-semibold flex-1">{{ item.title }}</span>
              <i class="pi pi-arrow-right"></i>
            </a>
            <p class="text-lg text-surface-500 mt-3">{{ item.description }}</p>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class EnterpriseInteraction {
  enterpriseInteractionData = [
    {
      title: "Creating a Business Strategy Chart",
      description:
        "Outline a wireframe for a comprehensive business strategy chart that includes key objectives, timelines, and milestones.",
      image: "/pages/enterprise/interaction-img-1.png",
    },
    {
      title: "Scalable Tech Stack Diagram",
      description:
        "Develop a wireframe for a scalable technology stack diagram showing the different layers and components involved.",
      image: "/pages/enterprise/interaction-img-2.png",
    },
    {
      title: "Employee Training in the Digital Era",
      description:
        "Create a wireframe for an employee training progress tracker that visualizes individual and team progress through various training modules.",
      image: "/pages/enterprise/interaction-img-3.png",
    },
  ];
}
