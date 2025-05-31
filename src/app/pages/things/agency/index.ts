import { Component } from "@angular/core";
import { AgencyHero } from "./components/hero";
import { AgencySolutions } from "./components/solutions";
import { AgencyProjects } from "./components/projects";
import { AgencyTestimonials } from "./components/testimonials";
import { AgencyBlog } from "./components/blog";
import { AgencyFAQ } from "./components/faq";
import { AppFooterWithCTA } from "@/layout/components/app.footerwithcta";

@Component({
  selector: "agency",
  standalone: true,
  imports: [
    AgencyHero,
    AgencySolutions,
    AgencyProjects,
    AgencyTestimonials,
    AgencyBlog,
    AgencyFAQ,
    AppFooterWithCTA,
  ],
  template: ` <agency-hero />
    <agency-solutions />
    <agency-projects />
    <agency-testimonials />
    <agency-blog />
    <agency-faq />
    <app-footer-with-cta className="mt-24 lg:mt-64" />`,
})
export class Agency {}
