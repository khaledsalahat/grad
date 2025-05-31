import { Component } from "@angular/core";
import { chaletsHero } from "./components/hero";
import { chaletsGallery } from "./components/gallery";
import { chaletsGrid } from "./components/grid";
import { Selector } from "./components/selector";

@Component({
  selector: "chalets",
  standalone: true,
  imports: [chaletsHero, chaletsGallery, chaletsGrid, Selector],
  template: `
    <chalets-hero />
    <chalet-selector (filtersChanged)="onFiltersChanged($event)" />
    <chalets-gallery />
    <chalets-grid
      [locationFilter]="currentFilters?.location"
      [dateFilter]="currentFilters?.date"
    ></chalets-grid>
  `,
})
export class chalets {
  currentFilters?: { location: string; date: Date };

  onFiltersChanged(filters: { location: string; date: Date }) {
    this.currentFilters = filters;
  }
}
