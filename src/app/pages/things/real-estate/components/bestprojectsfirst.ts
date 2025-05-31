import { Component } from "@angular/core";
import { RealEstateBestProjects } from "./bestprojects";

@Component({
  selector: "real-estate-best-projects-first",
  standalone: true,
  imports: [RealEstateBestProjects],
  template: `
    <real-estate-best-projects
      [items]="[
        {
          image: '/pages/real-estate/best-project-1.jpg',
          title: 'We have been serving our  ',
          description:
            'We have been serving our valued clients for over 20 years, providing expert guidance and support in all aspects of real estate.',
        },
        {
          image: '/pages/real-estate/best-project-2.jpg',
          title: 'Discover Your Dream Home',
          description:
            'Explore a wide range of properties that suit every budget and lifestyle, making your home-buying journey easier and more enjoyable.',
        },
        {
          image: '/pages/real-estate/best-project-3.jpg',
          title: 'Investment Opportunities',
          description:
            'Unlock lucrative real estate investment opportunities that offer great returns, supported by our expert team of professionals.',
        },
      ]"
    />
  `,
})
export class RealEstateBestProjectsFirst {}
