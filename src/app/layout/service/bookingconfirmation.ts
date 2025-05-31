export interface BookingConfirmation {
    bookingId: string;
    status: "confirmed" | "pending" | "failed";
    confirmationCode: string;
    venueId: string;
    startDate: string;
    endDate: string;
    guestCount: number;
    totalPrice: number;
    customerName: string;
    customerEmail: string;
    paymentMethod: string;
    paymentTransactionId: string;
    createdAt: string;

}