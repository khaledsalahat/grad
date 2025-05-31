import { PricingOption } from './pricing.model';

export interface BookingRequest {
    id?: string;
    venueId: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    duration: string;
    venueName: string;
    unavailableDates?: string[];
    guestCount: number;
    totalPrice: number;
    paidAmount: number;
    isDeposit: boolean;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    specialRequests?: string;
    paymentTransactionId: string;
    paymentMethod: string;
    pricingOption?: PricingOption[];
    checkInTime?: string;
    checkoutTime?: string;
    venueType?: "wedding-hall" | "chalet";
    status?: "pending" | "accepted" | "rejected";
    weddingHallCheckInTime?: string;
    weddingHallCheckoutTime?: string;
}
