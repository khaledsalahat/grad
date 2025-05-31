import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ELearningHero } from "./components/hero";
import { ELearningFeatures } from "./components/features";
import { ELearningNetwork } from "./components/network";
import { ELearningVideoLecture } from "./components/lecture";
import { ELearningTeachers } from "./components/teachers";
import { ELearningCTA } from "./components/cta";
import { ELearningTestimonials } from "./components/testimonials";
import { ELearningPodcasts } from "./components/podcast";
import { ELearningNavigating } from "./components/navigating";
import { ELearningFAQ } from "./components/faq";
import { AppFooter } from "@/layout/components/app.footer";

@Component({
  selector: "e-learning",
  standalone: true,
  imports: [
    CommonModule,
    ELearningHero,
    ELearningFeatures,
    ELearningNetwork,
    ELearningVideoLecture,
    ELearningTeachers,
    ELearningCTA,
    ELearningTestimonials,
    ELearningPodcasts,
    ELearningNavigating,
    ELearningFAQ,
    AppFooter,
  ],
  template: `<e-learning-hero />
    <e-learning-features />
    <e-learning-network />
    <e-learning-video-lecture />
    <e-learning-teachers />
    <e-learning-cta />
    <e-learning-testimonials />
    <e-learning-podcasts />
    <e-learning-navigating />
    <e-learning-faq />
    <app-footer className="mt-24 lg:mt-64" />`,
})
export class ELearning {}
