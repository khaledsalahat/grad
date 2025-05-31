import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TravelDestinationGridCard } from "./gridcard";

@Component({
  selector: "travel-destination-grid",
  standalone: true,
  imports: [CommonModule, TravelDestinationGridCard],
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
      class="mx-auto mt-14 relative min-[1200px]:w-[1152px] w-full min-[1200px]:h-[135rem] "
    >
      <travel-destination-grid-card
        className="min-[1200px]:top-0 min-[1200px]:left-0 w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[616px] my-6 min-[1200px]:my-0 "
        image="/pages/travel/opera/opera4.jpg"
        title="Opera Halls, Nablus"
        href="/details"
      />
      <travel-destination-grid-card
        className="min-[1200px]:top-0 min-[1200px]:left-[391px] w-full md:w-1/2 mx-auto min-[1200px]:w-[761px] h-[369px]  my-6 min-[1200px]:my-0"
        image="/pages/travel/w/w2.jpg"
        title="W villa , Nablus, Talluza"
        href="/details"
      />

      <travel-destination-grid-card
        className="min-[1200px]:top-[390px] min-[1200px]:left-[391px] w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[597px]  my-6 min-[1200px]:my-0"
        image="/pages/travel/rawnaq/rawnaq2.jpg"
        title="Rawnaq villa, Nablus, Talluza"
        href="/details"
      />
      <travel-destination-grid-card
        className="min-[1200px]:top-[390px] min-[1200px]:left-[782px] w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[312px]  my-6 min-[1200px]:my-0 "
        image="/pages/travel/salfit/salfit1.jpg"
        title="Salfit Grand Halls, Salfit"
        href="/details" 
      />

      <travel-destination-grid-card
        className="min-[1200px]:top-[637px] min-[1200px]:left-0 w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[350px]  my-6 min-[1200px]:my-0"
        image="/pages/travel/lords/lords1.jpg"
        title="Lords Resort & Villas, Jericho"
        href="/details"
      />
      <travel-destination-grid-card
        className="min-[1200px]:top-[723px] min-[1200px]:left-[782px] w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[599px]  my-6 min-[1200px]:my-0"
        image="/pages/travel/gardinea/gardinea3.jpg"
        title="Gardenya, Jenin"
        href="/details"
      />

      <travel-destination-grid-card
        className="min-[1200px]:top-[1008px] min-[1200px]:left-0 w-full md:w-1/2 mx-auto min-[1200px]:w-[761px] h-[314px]  my-6 min-[1200px]:my-0"
        image="/pages/travel/andalus/andalus3.jpg"
        title="Andalus Venue, Ramallah"
        href="/details"
      />

      <travel-destination-grid-card
        className="min-[1200px]:top-[1343px] min-[1200px]:left-0 w-full md:w-1/2 mx-auto min-[1200px]:w-[370px] h-[314px] my-6 min-[1200px]:my-0"
        image="/pages/travel/ibiza/ibiza1.jpg"
        title="Ibiza Villas, Jenin"
        href="/details"
      />
      <travel-destination-grid-card
        className="min-[1200px]:top-[1343px] min-[1200px]:left-[391px] w-full md:w-1/2 mx-auto min-[1200px]:w-[761px] h-[314px] my-6 min-[1200px]:my-0"
        image="/pages/travel/victoria/victoria1.jpg"
        title="Victoria Villa, Jericho"
        href="/details"
      />
    </div>
  </div>`,
})
export class TravelDestinationGrid { }
