import { Component, computed, inject, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { twMerge } from "tailwind-merge";
import { StyleClassModule } from "primeng/styleclass";
import {
  SelectButtonChangeEvent,
  SelectButtonModule,
} from "primeng/selectbutton";
import { LayoutService } from "@/layout/service/layout.service";
import { updatePreset, updateSurfacePalette } from "@primeng/themes";
import { FormsModule } from "@angular/forms";

interface ColorType {
  name: string;
  palette: Record<string, string>;
}

@Component({
  selector: "app-configurator",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    StyleClassModule,
    SelectButtonModule,
    FormsModule,
  ],
  template: `
    <div
      [class]="
        twMerge(
          'fixed hidden bottom-6 xl:bottom-auto xl:top-6 right-6 z-[9999999]',
          className
        )
      "
    >
      <button
        pStyleClass="@next"
        enterFromClass="hidden"
        enterActiveClass="animate-scalein"
        leaveToClass="hidden"
        leaveActiveClass="animate-fadeout"
        [hideOnOutsideClick]="true"
        class="config-button relative group rounded-lg w-10 h-10 flex items-center justify-center transition-all overflow-hidden"
      >
        <span
          [ngStyle]="{
            'animation-duration': '2s',
            background:
              'conic-gradient(from 90deg, #f97316, #f59e0b, #eab308, #84cc16, #22c55e, #10b981, #14b8a6, #06b6d4, #0ea5e9, #3b82f6, #6366f1, #8b5cf6, #a855f7, #d946ef, #ec4899, #f43f5e)',
          }"
          class="absolute -top-5 -left-5 w-20 h-20 animate-spin"
        ></span>
        <span
          [style]="{ inset: '1px', borderRadius: '0.42rem' }"
          class="absolute z-2 bg-surface-0 dark:bg-surface-900 group-hover:bg-surface-100 dark:group-hover:bg-surface-800 transition-all"
        ></span>
        <span class="relative z-10 text-surface-800 dark:text-surface-100 flex">
          <i class="pi pi-palette !text-lg !leading-none"></i>
        </span>
      </button>

      <div
        [class]="
          'hidden flex flex-col gap-4 absolute bottom-[calc(100%+0.5rem)] xl:bottom-auto xl:top-[calc(100%+0.5rem)] right-0 w-[15.4rem] h-fit p-3 rounded-lg bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 shadow-sm transition-all ease-in-out'
        "
      >
        <!-- <div>
          <span class="text-lg font-semibold">Primary Color</span>
          <div class="pt-2 flex gap-2 flex-wrap">
            <button
              *ngFor="let primaryColor of primaryColors"
              [title]="primaryColor.name"
              type="button"
              [ngClass]="{
                'w-5 h-5 rounded-md border border-black/16 dark:border-white/12 outline outline-offset-2': true,
                'outline-1':
                  layoutService.layoutConfig().primary === primaryColor.name,
                'focus:outline-1 outline-0':
                  layoutService.layoutConfig().primary !== primaryColor.name,
              }"
              [ngStyle]="{
                backgroundColor: primaryColor.palette['500'],
                outlineColor: primaryColor.palette['500'],
              }"
              (click)="updateColors('primary', primaryColor)"
            ></button>
          </div>
        </div> -->

        <!-- <div>
          <span class="text-lg font-semibold">Surface</span>
          <div class="pt-2 flex gap-2 flex-wrap">
            <button
              *ngFor="let surface of surfaces"
              [title]="surface.name"
              type="button"
              [ngClass]="{
                'w-5 h-5 rounded-md border border-black/16 dark:border-white/12 outline outline-offset-2': true,
                'outline-1':
                  layoutService.layoutConfig().surface === surface.name,
                'focus:outline-1 outline-0':
                  layoutService.layoutConfig().surface !== surface.name,
              }"
              [ngStyle]="{ 'background-color': surface.palette['500'] }"
              (click)="updateColors('surface', surface)"
            ></button>
          </div>
        </div> -->

        <!-- <div>
          <span class="text-lg font-semibold">Hero Container Style</span>
          <p-selectbutton
            [ngModel]="configHeroType()"
            [options]="heroTypes"
            optionLabel="name"
            optionValue="value"
            [allowEmpty]="false"
            (onChange)="toggleHeroContainer($event)"
          />
        </div> -->

        <div>
          <div class="flex flex-col gap-2">
            <span class="text-lg font-semibold">Color Scheme</span>
            <p-selectbutton
              [ngModel]="configTheme()"
              [options]="themeOptions"
              optionLabel="name"
              optionValue="value"
              [allowEmpty]="false"
              (onChange)="toggleDarkMode()"
            />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppConfigurator implements OnInit {
  @Input() className: any = "";

  twMerge = twMerge;

  layoutService = inject(LayoutService);

  configTheme = computed(() => this.layoutService.layoutConfig().darkTheme);

  configHeroType = computed(
    () => this.layoutService.layoutConfig().heroContainerType,
  );

  themeOptions = [
    { name: "Dark", value: true },
    { name: "Light", value: false },
  ];

  heroTypes = [
    { name: "Compact", value: "compact" },
    { name: "Wide", value: "wide" },
  ];

  primaryColors = [
    {
      name: "emerald",
      palette: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22",
      },
    },
    // ... rest of the primary colors remain the same ...
  ];

  surfaces = [
    {
      name: "slate",
      palette: {
        0: "#ffffff",
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617",
      },
    },
    // ... rest of the surfaces remain the same ...
  ];

  ngOnInit() {
    // Initialize dark mode if not set
    this.layoutService.layoutConfig.update((prev) => ({
      ...prev,
      darkTheme: true,
    }));

    document.documentElement.classList.add("dark");
  }

  getPresetExt() {
    const color = this.primaryColors.find(
      (c) => c.name === this.layoutService.layoutConfig().primary,
    )!;

    return {
      semantic: {
        primary: color.palette,
        colorScheme: {
          light: {
            primary: {
              color: "{primary.500}",
              contrastColor: "#ffffff",
              hoverColor: "{primary.600}",
              activeColor: "{primary.700}",
            },
            highlight: {
              background: "{primary.50}",
              focusBackground: "{primary.100}",
              color: "{primary.700}",
              focusColor: "{primary.800}",
            },
          },
          dark: {
            primary: {
              color: "{primary.400}",
              contrastColor: "{surface.900}",
              hoverColor: "{primary.300}",
              activeColor: "{primary.200}",
            },
            highlight: {
              background: "color-mix(in srgb, {primary.400}, transparent 84%)",
              focusBackground:
                "color-mix(in srgb, {primary.400}, transparent 76%)",
              color: "rgba(255,255,255,.87)",
              focusColor: "rgba(255,255,255,.87)",
            },
          },
        },
      },
    };
  }

  updateColors(type: string, color: ColorType) {
    if (type === "primary") {
      this.layoutService.layoutConfig.update((val) => ({
        ...val,
        primary: color.name,
      }));
    } else if (type === "surface") {
      this.layoutService.layoutConfig.update((val) => ({
        ...val,
        surface: color.name,
      }));
    }

    this.applyTheme(type, color);
  }

  applyTheme(type: string, color: ColorType) {
    if (type === "primary") {
      updatePreset(this.getPresetExt());
    } else if (type === "surface") {
      updateSurfacePalette(color.palette);
    }
  }

  toggleDarkMode() {
    if (!document.startViewTransition) {
      this.executeDarkModeToggle();
      return;
    }

    document.startViewTransition(() => this.executeDarkModeToggle());
  }

  executeDarkModeToggle() {
    this.layoutService.layoutConfig.update((prev) => ({
      ...prev,
      darkTheme: !prev.darkTheme,
    }));

    document.documentElement.classList.toggle("dark");
  }

  toggleHeroContainer(e: SelectButtonChangeEvent) {
    this.layoutService.layoutConfig.update((val) => ({
      ...val,
      heroContainerType: e.value,
    }));
  }
}
