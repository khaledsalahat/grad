import { Availability } from "./availability.model";
import { PricingOption } from "./pricing.model";

export interface Venue {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  type: "wedding-hall" | "chalet";
  location: string;
  capacity?: number;
  pricePerDay: number;
  pricePerHour?: number;
  photos: string[];
  bathrooms?: number;
  rooms?: number;
  amenities: string[];
  mainPicture: string;
  MainPictureUrl?: string;
  createdAt: string;
  availableDates: string[];
  unavailableDates: string[];
  availability: Availability[];
  globalTimeSlots?: {
    startTime: string;
    endTime: string;
    slotName?: string;
  }[];
  requests?: {
    id: string;
    user: { id: string; name: string; email: string };
    date: string;
    status: string;
  }[];
  startTime?: string;
  endTime?: string;
  checkInTime?: Date | string;
  checkoutTime?: Date | string;
  weddingHallCheckInTime?: Date | string;
  weddingHallCheckoutTime?: Date | string;
  pricing?: PricingOption[];
  status: "pending" | "approved" | "rejected";
  submissionDate: string;
  approvalDate?: string;
  adminComment?: string;
  ownerDetails?: {
    name: string;
    email: string;
    phone: string;
  };
}
