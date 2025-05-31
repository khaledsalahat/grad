import { PricingOption } from "./pricing.model";

export interface Request {
    id: string;
    userId: string;
    venueName: string;
    ownerId: string;
    venueId: string;
    status: "pending" | "accepted" | "denied";
    dates: {
        start: string;
        end: string;
    };
    guestCount: number;
    createdAt: string;
    updatedAt: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    specialRequests?: string;
    paymentType: "full" | "deposit";
    startDate: string;
    endDate: string;
    priceingOption?: PricingOption[];
    checkInTime?: string;
    checkoutTime?: string;
    duration: string;
    paidAmount: number;
    paymentMethod: string;
    venueType?: "wedding-hall" | "chalet";
    weddingHallCheckInTime?: string;
    weddingHallCheckoutTime?: string;
    timeSlot?: 'morning' | 'evening';
    totalPrice?: number;
}
