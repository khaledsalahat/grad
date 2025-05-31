import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { twMerge } from "tailwind-merge";
import { TestimonialsCard } from "./card";

@Component({
  selector: "testimonials-with-button",
  standalone: true,
  imports: [CommonModule, TestimonialsCard],
  template: ` <div
    [class]="
      twMerge('relative flex flex-col items-center justify-center ', className)
    "
  >
    <div
      class="flex items-start gap-6 [mask-image:_linear-gradient(to_top,transparent_5%,white_40%)]"
    >
      <div class="w-[25%] flex-col gap-6 lg:flex hidden">
        <testimonials-card
          *ngFor="let item of firstColumn; let index = index"
          [item]="item"
        />
      </div>
      <div class="w-full lg:w-[50%] flex flex-col gap-6">
        <testimonials-card
          [item]="{
            avatar: '/avatars/female-6.jpg',
            name: 'Bessie Kapoor',
            job: 'Customer Service',
            text: 'An amazing experience from start to finish! The team was always responsive, open to feedback, and incredibly attentive to every detail. They not only understood our requirements but also went above and beyond to ensure that the final product aligned perfectly with our vision.',
          }"
        />
        <div class="flex items-start gap-6">
          <div class="w-full md:w-1/2 flex flex-col gap-6">
            <testimonials-card
              *ngFor="let item of secondColumn; let index = index"
              [item]="item"
            />
          </div>
          <div class="w-1/2 hidden md:flex flex-col gap-6">
            <testimonials-card
              *ngFor="let item of thirdColumn; let index = index"
              [item]="item"
            />
          </div>
        </div>
      </div>
      <div class="w-[25%] hidden lg:flex flex-col gap-6">
        <testimonials-card
          *ngFor="let item of fourthColumn; let index = index"
          [item]="item"
        />
      </div>
    </div>
    <button
      class="px-8 py-5 font-semibold rounded-full bg-surface-950 dark:bg-surface-0 hover:opacity-75 transition-all text-surface-0 dark:text-surface-950 leading-none"
    >
      All Customer Reviews
    </button>
  </div>`,
})
export class TestimonialsWithButton {
  twMerge = twMerge;

  @Input() className: string = "";

  firstColumn = [
    {
      avatar: "/avatars/female-1.jpg",
      name: "Jane Cooper",
      job: "Product Designer",
      text: "Working with this team was an incredible experience. They understood our needs perfectly and delivered a product that exceeded our expectations.",
    },
    {
      avatar: "/avatars/female-2.jpg",
      name: "Olivia Holt",
      job: "Product Designer",
      text: "I am impressed by the professionalism and attention to detail. The team was always available to answer our questions and provide updates.",
    },
    {
      avatar: "/avatars/female-3.jpg",
      name: "John Doe",
      job: "UX/UI Designer",
      text: "This was a smooth and efficient process from start to finish. The final result speaks for itself—highly recommend!",
    },
    {
      avatar: "/avatars/male-4.jpg",
      name: "Lisa Brown",
      job: "Graphic Designer",
      text: "The team's creativity and ability to bring our vision to life was outstanding. We are thrilled with the end result.",
    },
  ];

  secondColumn = [
    {
      avatar: "/avatars/male-1.jpg",
      name: "Michael Scott",
      job: "Marketing Manager",
      text: "The service was impeccable! They delivered on time and with great quality. I couldn't have asked for a better experience.",
    },
    {
      avatar: "/avatars/male-2.jpg",
      name: "Angela Martin",
      job: "Operations Manager",
      text: "A highly skilled team that always puts the customer first. Their ability to solve complex challenges is truly impressive.",
    },
    {
      avatar: "/avatars/male-3.jpg",
      name: "Pam Beesly",
      job: "Creative Director",
      text: "They went above and beyond to ensure we were happy with the final product. Their passion for design is evident in every detail.",
    },
  ];

  thirdColumn = [
    {
      avatar: "/avatars/female-4.jpg",
      name: "Dwight Schrute",
      job: "Assistant",
      text: "Their organizational skills and creativity are unmatched. I was blown away by how quickly they understood our business needs.",
    },
    {
      avatar: "/avatars/female-5.jpg",
      name: "Stanley Hudson",
      job: "Sales Associate",
      text: "Everything was handled professionally and with great care. I appreciate their attention to detail and timely delivery.",
    },
    {
      avatar: "/avatars/female-6.jpg",
      name: "Ryan Howard",
      job: "Business Analyst",
      text: "The final product was everything I imagined and more. A dedicated team with a deep understanding of their craft.",
    },
  ];

  fourthColumn = [
    {
      avatar: "/avatars/female-5.jpg",
      name: "Kelly Kapoor",
      job: "Customer Service ",
      text: "An amazing experience from start to finish! The team was always responsive and open to feedback. Highly recommend!",
    },
    {
      avatar: "/avatars/male-4.jpg",
      name: "Meredith Palmer",
      job: "Supplier Relations",
      text: "They delivered exactly what we needed, on time and within budget. A fantastic team!",
    },
    {
      avatar: "/avatars/female-1.jpg",
      name: "Toby Flenderson",
      job: "HR Manager",
      text: "The team was professional and easy to work with. They took the time to understand our needs and delivered an exceptional product.",
    },
    {
      avatar: "/avatars/female-5.jpg",
      name: "Oscar Martinez",
      job: "Accountant",
      text: "Their attention to detail and focus on the customer made all the difference. The final result exceeded our expectations.",
    },
  ];
}
