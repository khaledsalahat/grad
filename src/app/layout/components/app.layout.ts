import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppConfigurator } from "./app.configurator";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, RouterModule, AppConfigurator],
  template: `<div>
    <app-configurator />
    <router-outlet></router-outlet>
  </div> `,
})
export class AppLayout {}
