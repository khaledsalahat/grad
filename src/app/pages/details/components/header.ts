import { Component, computed, inject, OnInit } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { CommonModule } from "@angular/common";
import { AppNavbar } from "@/layout/components/app.navbar";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { VenueService } from "@/layout/service/venue.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [AnimatedContainer, CommonModule, AppNavbar, RouterModule],
  template: `
    <animated-container [className]="isWide() ? 'overflow-hidden' : 'pt-6'">
      <div
        *ngIf="isWide()"
        class="h-[52rem] absolute top-0 left-0 w-full overflow-hidden"
      >
        <img
          class="object-cover min-w-96 absolute top-0 bottom-0 right-0 left-0 w-full h-full"
          [src]="heroImage"
          alt="Venue Hero Background"
        />
        <div
          class="absolute inset-0 z-1 opacity-75 bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_49.65%,rgba(0,0,0,0.00)_100%)]"
        ></div>
        <div
          class="absolute lg:opacity-100 opacity-50 z-10 bottom-0 inset-x-0 h-[22rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_62.59%,#FFF_100%)] dark:bg-[linear-gradient(180deg,rgba(9,9,11,0.00)_0%,rgba(9,9,11,0.8)_62.59%,rgba(9,9,11,1)_100%)] lg:backdrop-blur-[0.75px]"
        ></div>
      </div>

      <div class="container">
        <div
          [ngClass]="{
            'relative rounded-b-md rounded-t-3xl lg:rounded-t-4xl h-[52rem]': true,
            'overflow-hidden': !isWide(),
          }"
        >
          <div class="absolute inset-0 overflow-y-clip">
            <ng-container *ngIf="!isWide()">
              <img
                class="object-cover min-w-96 absolute top-0 bottom-0 right-0 left-0 w-full h-full"
                [src]="heroImage"
                alt="Venue Hero Background"
              />
              <div
                class="absolute inset-0 z-1 opacity-50 bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_49.65%,rgba(0,0,0,0.00)_100%)]"
              ></div>
              <div
                class="absolute lg:opacity-100 opacity-50 z-10 bottom-0 inset-x-0 h-[22rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_62.59%,#FFF_100%)] dark:bg-[linear-gradient(180deg,rgba(9,9,11,0.00)_0%,rgba(9,9,11,0.8)_62.59%,rgba(9,9,11,1)_100%)] lg:backdrop-blur-[0.75px]"
              ></div>
            </ng-container>

            <div
              class="absolute left-1/2 -translate-x-1/2 top-64 z-3 flex flex-col items-center"
            >
              <div
                class="title bg-[linear-gradient(190deg,#FFF_-16.99%,rgba(255,255,255,0.00)_100%)] text-8xl lg:text-[17rem] leading-none lg:-mt-14"
              >
                {{ venueTitle }}
              </div>
            </div>
          </div>
          <app-navbar />
        </div>
      </div>
    </animated-container>
  `,
})
export class detailsHeader implements OnInit {
  layoutService = inject(LayoutService);
  private venueService = inject(VenueService);
  private route = inject(ActivatedRoute);

  heroImage = "";
  venueTitle = "";
  isDarkTheme = computed(() => this.layoutService.isDarkTheme());
  isWide = computed(() => this.layoutService.isWide());

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.venueService.getVenueDetails(id).subscribe({
          next: (venue) => {
            this.heroImage = venue.mainPicture;
            this.venueTitle = venue.title;
          },
          error: (err) => {
            console.error("Error loading venue:", err);
          },
        });
      }
    });
  }
}
