import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimatedContainer } from "@/layout/components/animatedcontainer";
import { IconUsers } from "@/layout/components/icon/users";

@Component({
  selector: "about-team",
  standalone: true,
  imports: [CommonModule, AnimatedContainer, IconUsers],
  template: `
    <div class="container mt-64">
      <div class="icon-box">
        <IconUsers className="w-9 h-9 lg:w-11 lg:h-11" />
      </div>
      <h1
        class="mt-10 text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 leading-tight text-center"
      >
        Meet Our
        <br />
        Leadership Team
      </h1>
      <p
        class="mt-7 text-lg lg:text-xl text-surface-500 dark:text-white/64 max-w-[40rem] text-center mx-auto"
      >
        Our success is driven by a dedicated team of professionals who bring
        their expertise and passion to every project. Get to know the leaders
        who are guiding our company to new heights.
      </p>
      <div
        class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-4xl overflow-hidden"
      >
        <animated-container
          *ngFor="let item of teamData; let index = index"
          [delay]="index * 100"
          className="relative h-[34rem] group"
        >
          <div
            class="absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.40)_64.82%)] group-hover:bg-[rgba(37,99,235,0.10)] transition-all"
          ></div>
          <img
            class="select-none object-cover -z-2 group-hover:grayscale transition-all absolute w-full h-full"
            [src]="item.image"
            alt="Logistic Team Person Image"
          />
          <div class="absolute left-8 right-8 bottom-6">
            <ul
              class="flex items-start justify-start group-hover:opacity-100 opacity-0 transition-all"
            >
              <li *ngFor="let soc of item.socials; let j = index">
                <a
                  class="cursor-pointer flex items-center justify-center h-8 px-4 bg-surface-0 rounded-full hover:opacity-80 transition-all"
                >
                  <i
                    [class]="
                      soc.icon +
                      ' text-sm bg-main-gradient bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'
                    "
                  ></i>
                </a>
              </li>
            </ul>
            <div class="title text-2xl mt-4">{{ item.name }}</div>
            <div class="mt-2 text-white/72 text-lg">{{ item.job }}</div>
          </div>
        </animated-container>
      </div>
    </div>
  `,
})
export class AboutTeam {
  teamData = [
    {
      name: "Alex Smith",
      job: "CEO",
      image: "/pages/logistic/team-person-1.jpg",
      socials: [
        {
          link: "",
          icon: "pi pi-twitter",
        },
      ],
    },
    {
      name: "Maya Johnson",
      job: "Chief Operating Officer",
      image: "/pages/logistic/team-person-2.jpg",
      socials: [
        {
          link: "",
          icon: "pi pi-twitter",
        },
      ],
    },
    {
      name: "David Brown",
      job: "Chief Financial Officer",
      image: "/pages/logistic/team-person-3.jpg",
      socials: [
        {
          link: "",
          icon: "pi pi-twitter",
        },
      ],
    },
    {
      name: "Sarah Williams",
      job: "Chief Marketing Officer",
      image: "/pages/logistic/team-person-4.jpg",
      socials: [
        {
          link: "",
          icon: "pi pi-twitter",
        },
      ],
    },
  ];
}
