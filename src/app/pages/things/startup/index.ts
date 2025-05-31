import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StartupHero } from "./components/hero";
import { StartupAnalytics } from "./components/analytics";
import { StartupFeatures } from "./components/features";
import { StartupTestimonials } from "./components/testimonials";
import { StartupContact } from "./components/contact";
import { StartupTeam } from "./components/team";
import { StartupFaq } from "./components/faq";
import { AppFooterWithCTA } from "@/layout/components/app.footerwithcta";

@Component({
  selector: "startup",
  standalone: true,
  imports: [
    CommonModule,
    StartupHero,
    StartupAnalytics,
    StartupFeatures,
    StartupTestimonials,
    StartupContact,
    StartupTeam,
    StartupFaq,
    AppFooterWithCTA,
  ],
  template: `
    <startup-hero />
    <startup-analytics />
    <startup-features />
    <startup-testimonials />
    <startup-contact />
    <startup-team />
    <startup-faq />
    <app-footer-with-cta className="mt-24 lg:mt-64" />
  `,
})
export class Startup {}
