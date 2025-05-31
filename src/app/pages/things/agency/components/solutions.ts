import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";

@Component({
  selector: "agency-solutions",
  standalone: true,
  imports: [CommonModule, AnimatedContainer],
  template: `
    <div class="container mt-24 lg:mt-64">
      <span class="text-xl font-semibold text-surface-950 dark:text-surface-0"
        >Our Services</span
      >
      <h1
        class="mt-2 text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0"
      >
        Crafting Solutions for Your Brand
      </h1>
      <div class="mt-14 flex flex-col">
        <animated-container
          *ngFor="let item of agencySolutionsData; let index = index"
          [delay]="index * 200"
        >
          <div
            class="group py-6 lg:py-8 pr-6 lg:pr-8 pl-8 lg:pl-12 rounded-full flex items-center justify-between hover:bg-surface-950 dark:hover:bg-surface-0 transition-colors cursor-pointer"
          >
            <div
              class="w-[23rem] flex-1 lg:flex-none text-4xl font-semibold text-surface-950 dark:text-surface-0 group-hover:text-surface-0 dark:group-hover:text-surface-950 transition-colors"
            >
              {{ item.title }}
            </div>
            <div class="lg:block hidden relative w-[25rem] h-full">
              <div
                class="group-hover:opacity-0 opacity-100 transition-all absolute top-1/2 -translate-y-1/2 text-lg text-surface-950 dark:text-surface-0"
              >
                {{ item.description }}
              </div>
              <div
                class="flex items-center gap-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]"
              >
                <div
                  *ngFor="let img of item.images"
                  class="h-[64px] w-[85px] rounded-md overflow-hidden relative"
                >
                  <img
                    class="object-cover"
                    [src]="img"
                    alt="Agency Solution Image"
                  />
                </div>
              </div>
            </div>
            <button
              class="w-20 h-20 shadow-stroke dark:shadow-none group-hover:shadow-none rounded-full flex items-center justify-center text-surface-950 dark:text-surface-0 group-hover:text-surface-0 dark:group-hover:text-surface-950 border-0 dark:border border-white/12 transition-all"
            >
              <i class="pi pi-arrow-right text-3xl"></i>
            </button>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class AgencySolutions {
  agencySolutionsData = [
    {
      title: "Logo & Branding ",
      description: `‘’We create unique logos and a strong brand identity that represent your business.‘’`,
      to: "",
      images: [
        "/pages/agency/solution-image-1.jpg",
        "/pages/agency/solution-image-2.jpg",
        "/pages/agency/solution-image-3.jpg",
        "/pages/agency/solution-image-4.jpg",
        "/pages/agency/solution-image-5.jpg",
      ],
    },
    {
      title: "Web Design",
      description: `‘’We develop applications that bring your business and user experience to the mobile world.‘’`,
      to: "",
      images: [
        "/pages/agency/solution-image-1.jpg",
        "/pages/agency/solution-image-2.jpg",
        "/pages/agency/solution-image-3.jpg",
        "/pages/agency/solution-image-4.jpg",
        "/pages/agency/solution-image-5.jpg",
      ],
    },
    {
      title: "Mobile App",
      description: `‘’We develop applications that bring your business and user experience to the mobile world.‘’`,
      to: "",
      images: [
        "/pages/agency/solution-image-1.jpg",
        "/pages/agency/solution-image-2.jpg",
        "/pages/agency/solution-image-3.jpg",
        "/pages/agency/solution-image-4.jpg",
        "/pages/agency/solution-image-5.jpg",
      ],
    },
    {
      title: "Illustration",
      description: `‘’We provide original illustrations that bring your brand to life through visual storytelling.‘’`,
      to: "",
      images: [
        "/pages/agency/solution-image-1.jpg",
        "/pages/agency/solution-image-2.jpg",
        "/pages/agency/solution-image-3.jpg",
        "/pages/agency/solution-image-4.jpg",
        "/pages/agency/solution-image-5.jpg",
      ],
    },
    {
      title: "Development",
      description: `‘’We lay the solid technological foundations to bring your projects to life.‘’`,
      to: "",
      images: [
        "/pages/agency/solution-image-1.jpg",
        "/pages/agency/solution-image-2.jpg",
        "/pages/agency/solution-image-3.jpg",
        "/pages/agency/solution-image-4.jpg",
        "/pages/agency/solution-image-5.jpg",
      ],
    },
  ];

  getFormattedIndex(index: number): string {
    return (index + 1).toString().padStart(2, "0");
  }
}
