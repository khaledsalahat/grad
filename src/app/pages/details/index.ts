import { Component } from "@angular/core";
import { detailsHeader } from "./components/header";
import { detailsGallery } from "./components/gallery";
import { VenueDetailsComponent } from "./components/venue.details";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [detailsHeader, detailsGallery, VenueDetailsComponent],
  template: `
    <app-header />
    <details-gallery />
    <venue-details />
  `,
})
export class details {}
