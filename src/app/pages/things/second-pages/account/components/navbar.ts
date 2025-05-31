import { Component, computed, inject } from "@angular/core";
import { LayoutService } from "@/layout/service/layout.service";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";
import { Router, NavigationEnd, RouterLink } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
@Component({
  selector: "account-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="w-full flex md:flex-row flex-col items-center gap-2 p-2 max-w-[calc(100%-3rem)] lg:max-w-none mx-auto rounded-3xl md:rounded-full bg-white/16 backdrop-blur-[48px] shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
    >
      <a
        *ngFor="let item of accountNavData; let index = index"
        [routerLink]="item.to"
        [class]="
          twMerge(
            'md:flex-1 w-full h-10 flex items-center justify-center rounded-full backdrop-blur-[48px] transition-all select-none',
            pathname === item.to
              ? 'bg-white/16 text-white'
              : 'text-white/64 hover:bg-white/10'
          )
        "
      >
        <span class="font-medium">{{ item.label }}</span>
      </a>
    </div>
  `,
})
export class AccountNavbar {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.isDarkTheme());

  isWide = computed(() => this.layoutService.isWide());

  twMerge = twMerge;

  pathname: any;

  routerEventsSubscription: Subscription = Subscription.EMPTY;

  constructor(private router: Router) {}

  ngOnInit() {
    this.pathname = this.router.url;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.pathname = event.urlAfterRedirects;
      });
  }

  accountNavData = [
    {
      label: "Account",
      to: "/second-pages/account",
    },
    {
      label: "Privacy & Security",
      to: "/second-pages/account/privacy-security",
    },
    {
      label: "Subscription & Billing",
      to: "/second-pages/account/subscription-billing",
    },
    {
      label: "Support",
      to: "/second-pages/account/support",
    },
  ];

  ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }
}
