import { Component } from "@angular/core";
import { BlogDetailHero } from "./components/hero";
import { BlogDetailContent } from "./components/content";
import { AppFooterWithCTA } from "@/layout/components/app.footerwithcta";

@Component({
  selector: "blog-detail",
  standalone: true,
  imports: [BlogDetailHero, BlogDetailContent, AppFooterWithCTA],
  template: `<blog-detail-hero />
    <blog-detail-content />
    <app-footer-with-cta className="mt-64" />`,
})
export class BlogDetail {}
