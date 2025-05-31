import { Component } from "@angular/core";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";

@Component({
  selector: "real-estate-listing",
  standalone: true,
  imports: [AnimatedContainer],
  template: `
    <animated-container
      className="container max-w-6xl flex lg:flex-row flex-col gap-12 mt-24 lg:mt-64"
    >
      <div
        class="w-full lg:flex-1 h-[31rem] rounded-3xl overflow-hidden shadow-blue-card relative"
      >
        <img
          class="object-cover w-full h-full"
          src="/pages/real-estate/listings-image.jpg"
          alt="Real Estate Listings Image"
        />
        <div
          class="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.07)_0%,rgba(0,0,0,0.07)_100%)]"
        ></div>
      </div>
      <div class="flex-1">
        <span class="badge">Building</span>
        <h3
          class="text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 !leading-tight mt-4"
        >
          Explore Exclusive Listings Today
        </h3>
        <p class="text-lg text-surface-500 dark:text-white/64 mt-6">
          Our database offers a range of properties, ensuring you find the
          perfect fit. From luxurious apartments to family homes, our listings
          bring you the latest and most desirable properties.
        </p>
        <p class="text-lg text-surface-500 dark:text-white/64 mt-8">
          With advanced search tools and personalized recommendations, finding
          your dream home is simple. Benefit from our guidance and market
          knowledge to make informed decisions and secure your ideal home.
        </p>
        <button class="button-gradient mt-8">Get Started</button>
      </div>
    </animated-container>
  `,
})
export class RealEstateListing {}
