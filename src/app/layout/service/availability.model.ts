export interface Availability {
    date: string;
    times?: {
        startTime: string;
        endTime: string;
    }[];
    globalTimeSlots?: {
        startTime: string;
        endTime: string;
    }[];
    unavailableTimes?: {
        startTime: string;
        endTime: string;
        bookingId?: string;
    }[];
    fullyBooked?: boolean;
    amBooked?: boolean;
    pmBooked?: boolean;
}
