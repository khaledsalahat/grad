import { Component } from "@angular/core";
import { LogisticHero } from "./components/hero";
import { LogisticWhoWeAre } from "./components/whoweare";
import { LogisticFeatures } from "./components/features";
import { LogisticServices } from "./components/services";
import { LogisticStreamline } from "./components/streamline";
import { LogisticTestimonials } from "./components/testimonials";
import { LogisticTeam } from "./components/team";
import { LogisticSolutions } from "./components/solutions";
import { LogisticFAQ } from "./components/faq";
import { LogisticFooter } from "./components/footer";

@Component({
  selector: "logistic",
  standalone: true,
  imports: [
    LogisticHero,
    LogisticWhoWeAre,
    LogisticFeatures,
    LogisticServices,
    LogisticStreamline,
    LogisticTestimonials,
    LogisticTeam,
    LogisticSolutions,
    LogisticFAQ,
    LogisticFooter,
  ],
  template: ` <logistic-hero />
    <logistic-who-we-are />
    <logistic-features />
    <logistic-services />
    <logistic-streamline />
    <logistic-testimonials />
    <logistic-team />
    <logistic-solutions />
    <logistic-faq />
    <logistic-footer />`,
})
export class Logistic {}
