import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "travel-destination-plan",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="container flex lg:flex-row flex-col items-center gap-18 mt-24 lg:mt-64"
    >
      <div
        class="max-w-[26rem] lg:max-w-none lg:flex-1 w-full h-[51rem] relative rounded-3xl lg:rounded-4xl overflow-hidden shadow-blue-card dark:shadow-black-card"
      >
        <img
          class="object-cover -z-2 w-full h-full"
          src="/pages/travel/destination-plan-bg.jpg"
          alt="Destination Plan Image"
        />
        <div
          class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.16)_100%)]"
        ></div>
        <div
          class="min-h-10 absolute bottom-8 lg:bottom-10 inset-x-8 lg:inset-x-10 flex items-center justify-between pl-5 pr-5 lg:pr-2 py-2 rounded-full bg-white/12 backdrop-blur-[6px] border border-white/12 shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02)]"
        >
          <div class="inline-flex items-center gap-2 text-white">
            <i class="pi pi-map-marker"></i>
            <span>Italy, Como</span>
          </div>
          <span class="w-px h-6 bg-white/64"></span>
          <div class="inline-flex items-center gap-2 text-white">
            <i class="pi pi-calendar"></i>
            <span>Sat, 3 Dec 2025</span>
          </div>
          <span class="lg:block hidden w-px h-6 bg-white/64"></span>
          <button
            class="lg:inline-flex hidden items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-white/20 hover:bg-white/40 transition-all border border-white/40 text-white"
          >
            <i class="pi pi-search"></i>
            <span class="font-medium">Search</span>
          </button>
        </div>
      </div>
      <div class="lg:flex-1">
        <span class="badge">World Explore</span>
        <h1
          class="text-5xl font-semibold text-surface-950 dark:text-surface-0 leading-tight mt-3.5"
        >
          Plan Your Holiday For Wonderful Discoveries
        </h1>
        <p class="mt-5 text-surface-500 dark:text-white/64 text-lg">
          Essential tips for planning your vacation, from choosing destinations
          to maximizing your trip.
        </p>
        <div class="mt-14 flex flex-col gap-8">
          <div>
            <h5
              class="text-2xl font-medium leading-tight text-surface-950 dark:text-surface-0"
            >
              Research Your Destination
            </h5>
            <p class="mt-4 text-lg text-surface-500 dark:text-white/64">
              Learn about the culture, climate, and attractions through guides,
              forums, and blogs.
            </p>
          </div>
          <div>
            <h5
              class="text-2xl font-medium leading-tight text-surface-950 dark:text-surface-0"
            >
              Budget Wisely
            </h5>
            <p class="mt-4 text-lg text-surface-500 dark:text-white/64">
              Estimate costs for lodging, food, transport, and activities.
              Compare prices to save money.
            </p>
          </div>
          <div>
            <h5
              class="text-2xl font-medium leading-tight text-surface-950 dark:text-surface-0"
            >
              Book in Advance
            </h5>
            <p class="mt-4 text-lg text-surface-500 dark:text-white/64">
              Reserve flights, lodging, and tours early for the best deals and
              stress-free planning.
            </p>
          </div>
          <div>
            <h5
              class="text-2xl font-medium leading-tight text-surface-950 dark:text-surface-0"
            >
              Pack Smart
            </h5>
            <p class="mt-4 text-lg text-surface-500 dark:text-white/64">
              Make a packing list based on weather and activities. Include
              travel documents and essentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TravelDestinationPlan {}
