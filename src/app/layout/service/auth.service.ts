import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import {
  BehaviorSubject,
  Observable,
  catchError,
  throwError,
  tap,
  retry,
  map,
} from "rxjs";
import { ApiService } from "./api.service";
import { LocalStorageService } from "./local-storage.service";
import { AuthFields, User, UserRole } from "@/types/user";

@Injectable({ providedIn: "root" })
export class AuthService {
  public currentUser = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_REFRESH_INTERVAL = 600000;

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUser.asObservable();

  constructor(
    private api: ApiService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.initializeAuth();
  }

  updateCurrentUser(user: User) {
    this.currentUser.next(user);
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.api
      .get<any>(`Auth/check-username?username=${username}`)
      .pipe(map((res) => res.available === false ? true : false));
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.api
      .get<any>(`Auth/check-email?email=${email}`)
      .pipe(map((res) => res.available === false ? true : false));
  }
  private initializeAuth() {
    const userData = LocalStorageService.CurrentUser;
    const token = LocalStorageService.AccessToken;

    if (userData && token) {
      try {
        this.currentUser.next(userData);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        this.clearAuthData();
      }
    }
  }

  private isTokenValid(exp?: number): boolean {
    return !!exp && Date.now() < exp * 1000;
  }

  private scheduleTokenRefresh() {
    setInterval(() => {
      this.refreshToken().subscribe();
    }, this.TOKEN_REFRESH_INTERVAL);
  }

  refreshToken(): Observable<any> {
    return this.api.post<{ token: string }>("refreshToken", {}).pipe(
      tap((response) => {
        LocalStorageService.AccessToken = response.token;
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  private clearAuthData() {
    LocalStorageService.AccessToken;
    LocalStorageService.CurrentUser;
    this.currentUser.next(null);
    this.updateAuthenticationState(false);
  }

  login(email: string, password: string): Observable<any> {
    return this.api
      .post<any>("auth/login", { email, password })
      .pipe(
        map((response) => {
          const user = {
            id: response.userId,
            email: response.email,
            username: response.username,
            role: (response.role || 'user').toLowerCase(),
            phoneNumber: response.phoneNumber ?? '',
            isBlocked: false,
          };
          this.handleAuthResponse({ user, token: response.token });
          return { user, token: response.token };
        }),
        catchError(this.handleError)
      );
  }
  signup(userData: any): Observable<any> {
    return this.api
      .post<any>('Auth/register', userData)
      .pipe(
        tap((response) => {
          const user = {
            id: response.userId,
            email: response.email,
            username: response.username || userData.username,
            phoneNumber: userData.phoneNumber ?? '',
            role: (response.role || 'user').toLowerCase(),
            isBlocked: false,
            venueCount: 0
          };
          LocalStorageService.AccessToken = response.token;
          LocalStorageService.CurrentUser = user;
          this.ngZone.run(() => {
            this.currentUser.next(user);
            this.isAuthenticatedSubject.next(true);
            this.router.navigate(["/"]);
          });
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            return throwError(
              () => new Error("Email or username already exists")
            );
          }
          return this.handleError(error);
        })
      );
  }

  logout(): void {
    this.clearAuthData();
    this.updateAuthenticationState(false);
    this.router.navigate(["/"]);
  }

  private handleAuthResponse(response: { user: User; token: string }): void {
    LocalStorageService.AccessToken = response.token;
    LocalStorageService.CurrentUser = response.user;
    this.ngZone.run(() => {
      this.currentUser.next(response.user);
      this.isAuthenticatedSubject.next(true);
      this.scheduleTokenRefresh();
    });
  }

  private redirectBasedOnRole(role: UserRole): void {
    const routes: { [key in UserRole]: string } = {
      [UserRole.Owner]: "/owner/dashboard",
      [UserRole.Admin]: "/admin/dashboard",
      [UserRole.User]: "/dashboard",
    };
    this.router.navigate([routes[role] || "/"]);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "An unknown error occurred!";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || error.message;
      if (error.status === 401) {
        this.clearAuthData();
        this.router.navigate(["/login"]);
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  getAuthHeader(): { [header: string]: string } {
    const token = LocalStorageService.AccessToken;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  get currentUser$1(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private updateAuthenticationState(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  get isOwner(): boolean {
    return this.currentUser.value?.role === UserRole.Owner;
  }

  get isAdmin(): boolean {
    return this.currentUser.value?.role === UserRole.Admin;
  }

  isCurrentUserOwner(): boolean {
    return this.currentUser.value?.role === UserRole.Owner;
  }

  isCurrentUserAdmin(): boolean {
    return this.currentUser.value?.role === UserRole.Admin;
  }

  getCurrentUserId(): string | undefined {
    return this.currentUser.value?.id;
  }


}
