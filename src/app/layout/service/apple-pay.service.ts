import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export interface ApplePaySession {
  id: string;
  status: "pending" | "completed" | "failed";
}

export interface ApplePayRequest {
  countryCode: string;
  currencyCode: string;
  merchantIdentifier: string;
  total: {
    label: string;
    amount: number;
  };
  lineItems?: Array<{
    label: string;
    amount: number;
  }>;
}

export interface ApplePayResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

@Injectable({
  providedIn: "root",
})
export class ApplePayService {
  private readonly merchantIdentifier = "merchant.com.venuerentals";

  constructor() { }

  isAvailable(): boolean {
    return true;
  }


  createSession(request: ApplePayRequest): Observable<ApplePaySession> {
    console.log("Creating Apple Pay session with request:", request);


    return of({
      id: "aps_" + Math.random().toString(36).substring(2, 15),
      status: "pending",
    });
  }


  processPayment(
    sessionId: string,
    amount: number,
  ): Observable<ApplePayResult> {
    console.log(
      `Processing Apple Pay payment for session ${sessionId} with amount ${amount}`,
    );

    return of({
      success: true,
      transactionId: "aptx_" + Math.random().toString(36).substring(2, 15),
    }).pipe(
      delay(1500),
    );
  }


  createPaymentRequest(
    venueName: string,
    totalAmount: number,
    lineItems?: Array<{ label: string; amount: number }>,
  ): ApplePayRequest {
    return {
      countryCode: "US",
      currencyCode: "USD",
      merchantIdentifier: this.merchantIdentifier,
      total: {
        label: `Booking for ${venueName}`,
        amount: totalAmount,
      },
      lineItems: lineItems,
    };
  }


  completeSession(sessionId: string, success: boolean): Observable<boolean> {
    console.log(
      `Completing Apple Pay session ${sessionId} with status ${success ? "success" : "failure"}`,
    );

    return of(true).pipe(
      delay(500),
    );
  }
}
