import { Component } from "@angular/core";
import { AboutHero } from "./components/hero";
import { AboutVisionMission } from "./components/visionmission";
import { AboutTestimonials } from "./components/testimonials";
import { AboutTeam } from "./components/team";
import { AboutSolutions } from "./components/solutions";
import { AppFAQ } from "@/layout/components/app.faq";
import { AppFooterWithCTA } from "@/layout/components/app.footerwithcta";

@Component({
  selector: "about",
  standalone: true,
  imports: [
    AboutHero,
    AboutVisionMission,
    AboutTestimonials,
    AboutTeam,
    AboutSolutions,
    AppFAQ,
    AppFooterWithCTA,
  ],
  template: `<about-hero />
    <about-vision-mission />
    <about-testimonials />
    <about-team />
    <about-solutions />
    <app-faq className="mt-64" />
    <app-footer-with-cta className="mt-64" />`,
})
export class About {}
