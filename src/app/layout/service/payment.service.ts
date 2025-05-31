import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export interface PaymentDetails {
  method: "apple-pay" | "credit-card" | "paypal";
  amount: number;
  currency: string;
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
    name: string;
  };
  bookingId: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  constructor() { }

  processPayment(details: PaymentDetails): Observable<PaymentResult> {
    console.log("Processing payment:", details);

    return of({
      success: true,
      transactionId:
        "TX" +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0"),
      message: "Payment processed successfully",
    }).pipe(delay(2000));
  }

  isApplePayAvailable(): boolean {
    return true;
  }

  initializeApplePay(): Observable<boolean> {
    console.log("Initializing Apple Pay");

    return of(true).pipe(delay(500));
  }

  processApplePayPayment(
    amount: number,
    currency: string,
    bookingId: string
  ): Observable<PaymentResult> {
    console.log("Processing Apple Pay payment:", {
      amount,
      currency,
      bookingId,
    });

    return of({
      success: true,
      transactionId:
        "APTX" +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0"),
      message: "Apple Pay payment processed successfully",
    }).pipe(delay(1500));
  }

  validateCreditCard(cardNumber: string, expiry: string, cvv: string): boolean {
    const cardNumberValid = /^\d{16}$/.test(cardNumber.replace(/\s/g, ""));

    const expiryValid = /^\d{2}\/\d{2}$/.test(expiry);

    const cvvValid = /^\d{3,4}$/.test(cvv);

    return cardNumberValid && expiryValid && cvvValid;
  }

  processPayPalPayment(
    amount: number,
    currency: string,
    bookingId: string
  ): Observable<PaymentResult> {
    console.log("Processing PayPal payment:", { amount, currency, bookingId });

    return of({
      success: true,
      transactionId:
        "PPTX" +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0"),
      message: "PayPal payment processed successfully",
    }).pipe(delay(1800));
  }
}
