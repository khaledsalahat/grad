import { Component } from "@angular/core";
import { ContactHero } from "./components/hero";
import { ContactAddress } from "./components/address";
import { AppFAQ } from "@/layout/components/app.faq";
import { AppFooterWithCTA } from "@/layout/components/app.footerwithcta";

@Component({
  selector: "contact",
  standalone: true,
  imports: [ContactHero, ContactAddress, AppFAQ, AppFooterWithCTA],
  template: ` <contact-hero />
    <contact-address />
    <app-faq className="mt-64" />
    <app-footer-with-cta className="mt-64" />`,
})
export class Contact {}
