import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EnterpriseHero } from "./components/hero";
import { EnterpriseFeatures } from "./components/features";
import { EnterpriseSolutions } from "./components/solutions";
import { EnterpriseTimelapse } from "./components/timelapse";
import { EnterpriseGrowth } from "./components/growth";
import { EnterpriseTestimonials } from "./components/testimonials";
import { EnterpriseInteraction } from "./components/interaction";
import { AppFooterWithCTA } from "@/layout/components/app.footerwithcta";

@Component({
  selector: "enterprise",
  standalone: true,
  imports: [
    CommonModule,
    EnterpriseHero,
    EnterpriseFeatures,
    EnterpriseSolutions,
    EnterpriseTimelapse,
    EnterpriseGrowth,
    EnterpriseTestimonials,
    EnterpriseInteraction,
    AppFooterWithCTA,
  ],
  template: `
    <enterprise-hero />
    <enterprise-features />
    <enterprise-solutions />
    <enterprise-timelapse />
    <enterprise-growth />
    <enterprise-testimonials />
    <enterprise-interaction />
    <app-footer-with-cta className="mt-24 lg:mt-64" />
  `,
})
export class Enterprise {}
