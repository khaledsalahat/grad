import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { BubbleMessage } from "@/layout/components/icon/bubblemessage";
import { TestimonialsFades } from "@/layout/components/testimonials/fades";

@Component({
  selector: "startup-testimonials",
  standalone: true,
  imports: [AnimatedContainer, BubbleMessage, TestimonialsFades],
  template: `
    <animated-container className="container mt-24 lg:mt-64">
      <div class="icon-box">
        <IconBubbleMessage className="w-9 h-9 lg:w-11 lg:h-11" />
      </div>
      <h1
        class="text-3xl lg:text-5xl text-surface-950 dark:text-surface-0 font-semibold max-w-xs lg:max-w-sm text-center mx-auto mt-10"
      >
        What Our Clients Are Saying
      </h1>
      <p
        class="mt-6 mx-auto max-w-lg text-center text-lg lg:text-xl text-surface-500 dark:text-white/64"
      >
        Hear from our satisfied clients about how our solutions have transformed
        their businesses and driven success.
      </p>
      <testimonials-fades className="mt-8 lg:mt-16" />
    </animated-container>
  `,
})
export class StartupTestimonials {}
