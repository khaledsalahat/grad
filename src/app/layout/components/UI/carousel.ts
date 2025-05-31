import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { twMerge } from "tailwind-merge";
import EmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType,
} from "embla-carousel";
import { Subject } from "rxjs";

@Component({
  selector: "ui-carousel",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section
      [class]="
        twMerge(
          'relative mx-auto',
          scaled ? 'max-w-[102rem]' : 'max-w-[88rem]',
          className
        )
      "
      [style]="{
        '--slide-height': height,
        '--slide-spacing': spacing,
        '--slide-size': size,
      }"
    >
      <ng-container *ngIf="!hideMask">
        <div
          class="absolute h-full w-[25%] bg-[linear-gradient(to_right,white_12%,transparent_100%)] dark:bg-[linear-gradient(to_right,var(--p-surface-950)_12%,transparent_100%)] left-0 z-10 pointer-events-none"
        ></div>
        <div
          class="absolute h-full w-[25%] bg-[linear-gradient(to_left,white_12%,transparent_100%)] dark:bg-[linear-gradient(to_left,var(--p-surface-950)_12%,transparent_100%)] right-0 z-10 pointer-events-none"
        ></div>
      </ng-container>

      <div #emblaRef [ngClass]="mergedClasses">
        <div
          [ngClass]="{
            'embla__container py-4 !flex touch-pan-y touch-pinch-zoom ml-[calc(var(--slide-spacing)*-1)] [backface-visibility:hidden]':
              !scaled,
            'flex ml-[calc(var(--slide-spacing)*-1)] py-8 touch-pan-y touch-pinch-zoom':
              scaled,
          }"
        >
          <ng-content></ng-content>
        </div>
      </div>

      <div
        *ngIf="!hideButtons"
        class="mt-8 mx-auto w-fit flex items-center gap-6"
      >
        <button
          class="w-32 h-12 rounded-full flex items-center justify-center shadow-stroke dark:shadow-black-card border-0 dark:border border-white/12"
          type="button"
          [disabled]="prevBtnDisabled"
          (click)="scrollPrev()"
        >
          <i class="pi pi-arrow-left !text-xl"></i>
        </button>
        <button
          class="w-32 h-12 rounded-full flex items-center justify-center shadow-stroke dark:shadow-black-card border-0 dark:border border-white/12"
          type="button"
          [disabled]="nextBtnDisabled"
          (click)="scrollNext()"
        >
          <i class="pi pi-arrow-right !text-xl"></i>
        </button>
      </div>
    </section>
  `,
})
export class UICarousel {
  @Input() className: string = "";
  @Input() scaled: boolean = false;
  @Input() scale: number = 0.36;
  @Input() height: string = "25rem";
  @Input() spacing: string = "1rem";
  @Input() size: string = "20%";
  @Input() hideMask: boolean = false;
  @Input() hideButtons: boolean = false;
  @Input() refContainerClass: string = "";
  @Input() options: EmblaOptionsType = {};

  @ViewChild("emblaRef") emblaRef!: ElementRef;

  emblaApi!: EmblaCarouselType | null;
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;
  tweenNodes: HTMLElement[] = [];
  tweenFactor: number = 0;
  emblaApiSubject = new Subject<EmblaCarouselType | null>();

  twMerge = twMerge;

  get mergedClasses(): string {
    return twMerge(
      `overflow-hidden ${!this.scaled ? "block" : ""}`,
      this.refContainerClass,
    );
  }

  get tweenFactorBase() {
    return this.scale ?? 0.36;
  }
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.initializeEmbla();
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  initializeEmbla() {
    if (this.emblaRef) {
      this.emblaApi = EmblaCarousel(this.emblaRef.nativeElement, this.options);
      this.emblaApiSubject.next(this.emblaApi);

      if (!this.emblaApi) return;

      this.updateButtonStates();

      if (this.scaled) {
        this.setTweenNodes();
        this.setTweenFactor();
        this.tweenScale();
      }

      this.emblaApi.on("reInit", () => {
        this.updateButtonStates();
        if (this.scaled) {
          this.setTweenNodes();
          this.setTweenFactor();
          this.tweenScale();
        }
      });

      this.emblaApi.on("scroll", () => {
        this.updateButtonStates();
        if (this.scaled) {
          this.tweenScale("scroll");
        }
      });

      this.emblaApi.on("slideFocus", () => {
        this.updateButtonStates();
        if (this.scaled) {
          this.tweenScale();
        }
      });
    }
  }

  updateButtonStates() {
    if (!this.emblaApi) return;
    this.prevBtnDisabled = !this.emblaApi.canScrollPrev();
    this.nextBtnDisabled = !this.emblaApi.canScrollNext();
  }

  setTweenNodes() {
    if (!this.emblaApi || !this.scaled) return;
    this.tweenNodes = this.emblaApi
      .slideNodes()
      .map((slideNode) => slideNode.querySelector(".embla__slide__item"))
      .filter((node): node is HTMLElement => node !== null);
  }

  setTweenFactor() {
    if (!this.emblaApi || !this.scaled) return;
    this.tweenFactor =
      this.tweenFactorBase * this.emblaApi.scrollSnapList().length;
  }

  tweenScale(eventName?: string) {
    if (!this.emblaApi || !this.scaled) return;

    const engine = this.emblaApi.internalEngine();
    const scrollProgress = this.emblaApi.scrollProgress();
    const slidesInView = this.emblaApi.slidesInView();

    this.emblaApi
      .scrollSnapList()
      .forEach((scrollSnap: number, snapIndex: number) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex: number) => {
          if (eventName === "scroll" && !slidesInView.includes(slideIndex))
            return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem: any) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * this.tweenFactor);
          const scale = this.numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = this.tweenNodes[slideIndex];

          if (tweenNode) {
            tweenNode.style.transform = `scale(${scale})`;
          }
        });
      });
  }

  numberWithinRange(number: number, min: number, max: number): number {
    return Math.min(Math.max(number, min), max);
  }

  scrollNext() {
    this.emblaApi?.scrollNext();
  }

  scrollPrev() {
    this.emblaApi?.scrollPrev();
  }

  ngOnDestroy() {
    if (this.emblaApi) {
      this.emblaApi.destroy();
    }
  }
}
