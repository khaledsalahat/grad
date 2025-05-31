import { Component } from "@angular/core";
import { TravelHero } from "./components/hero";
import { TravelDestinationGallery } from "./components/destination/gallery";
import { TravelDestinationGrid } from "./components/destination/grid";

@Component({
  selector: "travel",
  standalone: true,
  imports: [
    TravelHero,
    TravelDestinationGallery,
    TravelDestinationGrid,
  ],
  template: `
    <travel-hero />
    <travel-destination-gallery />
    <travel-destination-grid />
  `,
})
export class Travel { }
