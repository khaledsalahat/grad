import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppFooter } from "@/layout/components/app.footer";

@Component({
  selector: "real-estate-footer",
  standalone: true,
  imports: [CommonModule, AppFooter],
  template: `
    <app-footer className="mt-64" image="/pages/real-estate/footer-image.jpg" />
  `,
})
export class RealEstateFooter {}
