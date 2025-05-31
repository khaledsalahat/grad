import { Component } from "@angular/core";
import { AppFooter } from "@/layout/components/app.footer";

@Component({
  selector: "logistic-footer",
  standalone: true,
  imports: [AppFooter],
  template: `
    <app-footer className="mt-64" image="/pages/logistic/footer-image.jpg" />
  `,
})
export class LogisticFooter {}
