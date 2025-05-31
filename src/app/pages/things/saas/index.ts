import { Component } from "@angular/core";
import { WeddingHero } from "./components/hero";
import { WeddingDestinationGallery } from "./components/destination/gallery";
import { WeddingEscapeGallery } from "./components/escapegallery";
import { WeddingDestinationGrid } from "./components/destination/grid";
import { WeddingDestinationPlan } from "./components/destination/plan";
import { WeddingGuides } from "./components/guides";
import { WeddingCTA } from "./components/cta";
import { WeddingFooter } from "./components/footer";

@Component({
  selector: "wedding", // Keep this as `wedding` or change it if needed
  standalone: true,
  imports: [
    WeddingHero,
    WeddingDestinationGallery,
    // WeddingEscapeGallery,
    WeddingDestinationGrid,
    WeddingDestinationPlan,
    WeddingGuides,
    WeddingCTA,
    WeddingFooter,
  ],
  template: `
    <wedding-hero />
    <wedding-destination-gallery />
    <!-- <wedding-escape-gallery /> -->
    <wedding-destination-grid />
    <wedding-destination-plan />
    <wedding-guides />
    <wedding-cta />
    <wedding-footer />
  `,
})
export class Wedding {} // Renamed from `Travel` to `Wedding`
