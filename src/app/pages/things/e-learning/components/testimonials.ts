import { BubbleMessage } from "@/layout/components/icon/bubblemessage";
import { TestimonialsWithButton } from "@/layout/components/testimonials/withbutton";
import { Component } from "@angular/core";

@Component({
  selector: "e-learning-testimonials",
  standalone: true,
  imports: [BubbleMessage, TestimonialsWithButton],
  template: `
    <div class="container mt-24 lg:mt-64">
      <div class="icon-box">
        <IconBubbleMessage className="w-9 h-9 lg:w-11 lg:h-11" />
      </div>
      <h1
        class="mt-10 text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 max-w-lg leading-tight text-center mx-auto"
      >
        Real Stories Real Results Our Customers
      </h1>
      <p
        class="mt-6 text-lg text-surface-500 dark:text-white/64 max-w-lg mx-auto text-center"
      >
        Discover how our solutions have transformed businesses through authentic
        testimonials from our valued customers.
      </p>
      <testimonials-with-button className="mt-16" />
    </div>
  `,
})
export class ELearningTestimonials {}
