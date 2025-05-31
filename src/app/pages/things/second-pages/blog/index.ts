import { Component } from "@angular/core";
import { BlogHero } from "./components/hero";
import { BlogList } from "./components/list";
import { AppFooterWithCTA } from "@/layout/components/app.footerwithcta";

@Component({
  selector: "blog",
  standalone: true,
  imports: [BlogHero, BlogList, AppFooterWithCTA],
  template: `<blog-hero />
    <blog-list />
    <app-footer-with-cta className="mt-64" />`,
})
export class Blog {}
