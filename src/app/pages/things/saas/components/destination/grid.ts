import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WeddingDestinationGridCard } from "./gridcard";

@Component({
  selector: "wedding-destination-grid",
  standalone: true,
  imports: [CommonModule, WeddingDestinationGridCard],
  template: ` <div class="px-4 mt-24 lg:mt-64 overflow-hidden w-full">
    <h1
      class="text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 text-center max-w-xl mx-auto leading-tight"
    >
      Make your dream wedding come true
    </h1>
    <p
      class="mt-6 text-lg text-surface-500 dark:text-white/64 max-w-lg text-center mx-auto"
    >
      Discover Palestine's most popular wedding halls and create unforgettable
      memories.
    </p>
    <div
      class="mx-auto mt-14 relative min-[1200px]:w-[1152px] w-full min-[1200px]:h-[95rem] "
    >
      <wedding-destination-grid-card
        className="min-[1200px]:top-0 min-[1200px]:left-0 w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[616px] my-6 min-[1200px]:my-0 "
        image="/pages/travel/opera1.jpg"
        title="Opera Halls, Nablus"
        href="/"
      />
      <wedding-destination-grid-card
        className="min-[1200px]:top-0 min-[1200px]:left-[391px] w-full md:w-1/2 mx-auto min-[1200px]:w-[761px] h-[369px]  my-6 min-[1200px]:my-0"
        image="/pages/travel/grid-rome.jpg"
        title="Rome, Italy"
        href="/"
      />
      <wedding-destination-grid-card
        className="min-[1200px]:top-[637px] min-[1200px]:left-0 w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[350px]  my-6 min-[1200px]:my-0"
        image="/pages/travel/grid-norway.jpg"
        title="Geiranger, Norway"
        href="/"
      />
      <wedding-destination-grid-card
        className="min-[1200px]:top-[1008px] min-[1200px]:left-0 w-full md:w-1/2 mx-auto min-[1200px]:w-[761px] h-[314px]  my-6 min-[1200px]:my-0"
        image="/pages/travel/grid-sydney.jpg"
        title="Sydney, Australia"
        href="/"
      />
      <wedding-destination-grid-card
        className="min-[1200px]:top-[390px] min-[1200px]:left-[391px] w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[597px]  my-6 min-[1200px]:my-0"
        image="/pages/travel/grid-tokyo.jpg"
        title="Tokyo, Japan"
        href="/"
      />
      <wedding-destination-grid-card
        className="min-[1200px]:top-[390px] min-[1200px]:left-[782px] w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[312px]  my-6 min-[1200px]:my-0 "
        image="/pages/travel/grid-istanbul.jpg"
        title="Istanbul, Turkey"
        href="/"
      />
      <wedding-destination-grid-card
        className="min-[1200px]:top-[723px] min-[1200px]:left-[782px] w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[599px]  my-6 min-[1200px]:my-0"
        image="/pages/travel/grid-newyork.jpg"
        title="New York, USA"
        href="/"
      />
    </div>
  </div>`,
})
export class WeddingDestinationGrid {}
