import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";

@Component({
  selector: "agency-projects",
  standalone: true,
  imports: [CommonModule, AnimatedContainer],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div>
        <span class="text-xl font-semibold text-surface-950 dark:text-surface-0"
          >Our Work</span
        >
        <h1
          class="mt-2 text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0"
        >
          Projects and Success Stories
        </h1>
        <div
          class="mt-16 relative h-[35rem] rounded-4xl shadow-blue-card overflow-hidden"
        >
          <img
            class="object-cover w-full h-full"
            src="/pages/agency/projects-hero-image.jpg"
            alt="Agency Projects Hero Image"
          />
        </div>
        <div class="flex items-center gap-4 justify-between mt-10">
          <h5
            class="text-xl lg:text-3xl font-semibold text-surface-950 dark:text-surface-0"
          >
            Innovative Rebranding for Urban Style
          </h5>
          <span class="text-xl font-medium text-surface-950 dark:text-surface-0"
            >Logo & Branding</span
          >
        </div>
        <div
          class="mt-4 text-xl text-surface-500 dark:text-white/64 font-medium"
        >
          UrbanWear
        </div>
      </div>
      <div class="flex flex-col gap-24 lg:gap-36 mt-28">
        <animated-container
          *ngFor="let item of agencyProjectsData; let index = index"
          [className]="{
            'flex items-center flex-col lg:flex-row gap-10': true,
            'lg:flex-row-reverse': index % 2 !== 0,
          }"
        >
          <div
            class="lg:flex-1 w-full h-[35rem] rounded-4xl shadow-blue-card overflow-hidden relative"
          >
            <img
              class="object-cover w-full h-full"
              [src]="item.image"
              alt="Agency Project Image"
            />
          </div>
          <div
            class="w-full lg:flex-1 flex flex-col justify-between gap-4 lg:min-h-[31rem] h-full"
          >
            <div class="flex flex-col gap-4">
              <h5
                class="text-3xl font-semibold text-surface-950 dark:text-surface-0"
              >
                {{ item.title }}
              </h5>
              <span
                class="text-xl font-medium text-surface-500 dark:text-white/64"
                >{{ item.subtitle }}</span
              >
            </div>
            <div
              class="flex flex-col gap-2 text-xl text-surface-950 dark:text-surface-0"
            >
              <span>Services</span>
              <span>{{ item.services }}</span>
            </div>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class AgencyProjects {
  agencyProjectsData = [
    {
      title: "Innovative Rebranding for Urban Style",
      subtitle: "UrbanWear",
      services: "Logo & Branding",
      image: "/pages/agency/project-image-1.jpg",
    },
    {
      title: "Revolutionizing Online Presence",
      subtitle: "TechSphere",
      services: "Web Design, Development",
      image: "/pages/agency/project-image-2.jpg",
    },
    {
      title: "Crafting a Visual Identity",
      subtitle: "GreenEarth",
      services: "Logo & Branding, Illustration",
      image: "/pages/agency/project-image-3.jpg",
    },
    {
      title: "Digital Transformation in Retail",
      subtitle: "ShopEase",
      services: "Web Design, Development, Mobile App",
      image: "/pages/agency/project-image-4.jpg",
    },
  ];
}
