import { Component } from "@angular/core";
import { PricingHero } from "./components/hero";
import { PricingCompare } from "./components/compare";
import { PricingTestimonials } from "./components/testimonials";
import { AppFAQ } from "@/layout/components/app.faq";
import { AppFooterWithCTA } from "@/layout/components/app.footerwithcta";

@Component({
  selector: "pricing",
  standalone: true,
  imports: [
    PricingHero,
    PricingCompare,
    PricingTestimonials,
    AppFAQ,
    AppFooterWithCTA,
  ],
  template: `<pricing-hero />
    <pricing-compare />
    <pricing-testimonials />
    <app-faq className="mt-64" />
    <app-footer-with-cta className="mt-64" />`,
})
export class Pricing {}
