import { Component } from "@angular/core";
import { WeddingHallsHero } from "./components/hero";
import { WeddingHallsGallery } from "./components/gallery";
import { WeddingHallsGrid } from "./components/grid";
import { Selector } from "./components/selector";

@Component({
  selector: "wedding-halls",
  standalone: true,
  imports: [WeddingHallsHero, WeddingHallsGallery, WeddingHallsGrid, Selector],
  template: `
    <wedding-halls-hero />
    <wedding-hall-selector (filtersChanged)="onFiltersChanged($event)" />
    <wedding-halls-gallery />
    <wedding-halls-grid
      [locationFilter]="currentFilters?.location"
      [dateFilter]="currentFilters?.date"
    />
  `,
})
export class WeddingHalls {
  currentFilters?: { location: string; date: Date };

  onFiltersChanged(filters: { location: string; date: Date }) {
    this.currentFilters = filters;
  }
}
