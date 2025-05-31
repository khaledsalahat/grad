import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private readonly API_URL = "http://localhost:5164/api";
  // private readonly API_URL = "http://localhost:3000";


  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = LocalStorageService.AccessToken;
    if (!token) {
      console.error('No JWT token found in LocalStorage!');
      return new HttpHeaders();
    }

    const cleanToken = token;

    return new HttpHeaders({
      'Authorization': `Bearer ${cleanToken}`,
      'Content-Type': 'application/json'
    });
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const url = `${this.API_URL}/${cleanEndpoint}`;
    const headers = this.getAuthHeaders();
    console.log('[ApiService] GET', url, { params, headers });
    return this.http
      .get<T>(url, { params, headers })
      .pipe(
        tap((data) => {
          console.log('[ApiService] Response for', url, data);
        }),

        map((data: any) => (data && Array.isArray(data.$values) ? data.$values : data)),
        catchError(this.handleError)
      );
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    const mergedHeaders = headers ? headers : this.getAuthHeaders();
    return this.http
      .post<T>(`${this.API_URL}/${endpoint}`, body, { headers: mergedHeaders })
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.API_URL}/${endpoint}`, body, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.API_URL}/${endpoint}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .patch<T>(`${this.API_URL}/${endpoint}`, body, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUserDetails() {
    return this.get('users/me');
  }

  updateUserDetails(data: any) {
    return this.put('users/me', data);
  }

  private handleError(error: HttpErrorResponse) {
    console.error("API error:", error);
    return throwError(() => new Error(error.message || "Server Error"));
  }

  getApiUrl(): string {
    return this.API_URL;
  }
}
