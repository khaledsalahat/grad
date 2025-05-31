import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { CirclePattern } from "@/layout/components/circlepattern";

@Component({
  selector: "e-learning-cta",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, CirclePattern],
  template: `
    <animated-container className="container mt-24 lg:mt-64">
      <div
        class="bg-main-gradient shadow-black-card rounded-3xl lg:rounded-[3rem] h-[48rem] lg:h-auto p-8 lg:p-24 relative overflow-hidden"
      >
        <circle-pattern
          class="absolute w-[60rem] lg:right-0 lg:left-auto left-1/2 bottom-0 -translate-x-1/2 lg:translate-x-1/2 translate-y-1/2"
        />
        <div
          class="w-[38rem] h-[30rem] absolute lg:right-12 lg:left-auto left-1/2 -translate-x-1/2 lg:translate-x-0 bottom-0 lg:-bottom-6"
        >
          <img
            class="scale-[1.5] object-center lg:object-top object-contain"
            src="/pages/e-learning/cta-image.png"
            alt="CTA Image"
          />
        </div>
        <h1 class="title max-w-2xl text-3xl lg:text-5xl !leading-tight">
          Unlock a World of Knowledge Through Headphones
        </h1>
        <p class="description max-w-lg mt-6 text-white/64">
          Carry knowledge with you anytime through our content-rich podcasts and
          online courses.
        </p>
        <div class="mt-8 hidden lg:flex items-center gap-3">
          <button class="button-regular py-3">Get Started</button>
          <button
            class="button-blur bg-white/1 hover:bg-white/8 h-auto py-3 border-white/12"
          >
            <i class="pi pi-play-circle"></i>
            Discover Now
          </button>
        </div>
      </div>
    </animated-container>
  `,
})
export class ELearningCTA {}
