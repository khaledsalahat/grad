import { Component, ElementRef, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconStop } from "@/layout/components/icon/stop";
import { IconPlay } from "@/layout/components/icon/play";
import { IconSpotify } from "@/layout/components/icon/spotify";

@Component({
  selector: "e-learning-podcast-player",
  standalone: true,
  imports: [CommonModule, IconStop, IconPlay, IconSpotify],
  template: `
    <div class="mt-8 flex items-center gap-3.5">
      <button (click)="toggleIsPlaying()">
        @if (isPlaying) {
          <IconStop
            *ngIf="isPlaying"
            className="fill-surface-950 dark:fill-surface-0"
          />
        } @else {
          <IconPlay className="fill-surface-950 dark:fill-surface-0" />
        }
      </button>
      <div
        #progressBar
        class="flex-1 relative h-2 rounded-full bg-surface-200 dark:bg-surface-700 cursor-pointer"
        (click)="handleProgressClick($event)"
      >
        <div
          class="absolute h-full bg-main-gradient rounded-full pointer-events-none"
          [style]="{ width: (currentTime / totalSec) * 100 + '%' }"
        >
          <div
            class="absolute left-full -translate-x-2 cursor-pointer top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-surface-950 dark:bg-surface-0 border border-surface-0 dark:border-surface-950 transition-all duration-75 ease-linear"
          ></div>
        </div>
      </div>
      <span class="font-semibold text-surface-950 dark:text-surface-0 w-12">{{
        formatTime(currentTime)
      }}</span>
      <IconSpotify />
    </div>
  `,
})
export class ELearningPodcastPlayer {
  totalSec = 324;
  currentTime = 0;
  isPlaying = false;
  intervalRef: any = null;

  @ViewChild("progressBar", { static: false })
  progressRef!: ElementRef<HTMLDivElement>;

  toggleIsPlaying() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying && this.currentTime >= this.totalSec) {
      this.currentTime = 0;
    }

    if (this.isPlaying) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer() {
    this.intervalRef = setInterval(() => {
      if (this.currentTime >= this.totalSec) {
        this.isPlaying = false;
        this.stopTimer();
        return;
      }
      this.currentTime++;
    }, 1000);
  }

  stopTimer() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
      this.intervalRef = null;
    }
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  handleProgressClick(event: MouseEvent) {
    if (this.progressRef?.nativeElement) {
      const rect = this.progressRef.nativeElement.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      const clickPercentage = clickPosition / rect.width;
      this.currentTime = Math.floor(this.totalSec * clickPercentage);
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
