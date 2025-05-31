import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { ImageModule } from "primeng/image";

@Component({
  selector: "real-estate-cta",
  standalone: true,
  imports: [AnimatedContainer, ImageModule],
  template: `
    <animated-container className="container mt-64">
      <div
        class="flex items-center justify-center h-[21rem] lg:h-[45rem] relative rounded-4xl overflow-hidden px-4"
      >
        <div
          class="-z-1 absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.13)_0%,rgba(0,0,0,0.40)_45.3%)]"
        ></div>
        <p-image
          class="object-cover -z-2 absolute w-full h-full"
          src="/pages/real-estate/cta-background.jpg"
          alt="Real Estate CTA Background Image"
        />
        <div class="max-w-[16rem] lg:max-w-[38rem]">
          <h1 class="title text-3xl lg:text-7xl">
            Begin Your Home Journey Today
          </h1>
          <p class="text-lg text-white/72 max-w-[28rem] mt-6">
            Contact our expert team now to find your dream home and start your
            new chapter.
          </p>
          <button class="button-regular mt-8">
            Contact Us
            <i class="pi pi-arrow-right !text-sm"></i>
          </button>
        </div>
      </div>
    </animated-container>
  `,
})
export class RealEstateCTA {}
