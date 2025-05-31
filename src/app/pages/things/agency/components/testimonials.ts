import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { TestimonialsWithButton } from "@/layout/components/testimonials/withbutton";

@Component({
  selector: "agency-testimonials",
  standalone: true,
  imports: [AnimatedContainer, TestimonialsWithButton],
  template: `
    <animated-container className="mt-24 lg:mt-64 container">
      <span class="text-xl font-semibold text-surface-950 dark:text-surface-0"
        >Testimonial</span
      >
      <h1
        class="mt-2 text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 max-w-2xl leading-tight"
      >
        Real Stories Real Results Our Customers
      </h1>
      <testimonials-with-button className="mt-16" />
    </animated-container>
  `,
})
export class AgencyTestimonials {}
