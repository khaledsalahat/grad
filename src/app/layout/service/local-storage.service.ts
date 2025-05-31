import { User } from "@/types/user";
import { Injectable } from "@angular/core";
enum StorageKeys {
  AccessToken = "access_token",
  CurrentUser = "currentUser",
  refreshToken = "refresh_token",
}
@Injectable({
  providedIn: "root",
})
export abstract class LocalStorageService {
  private static setItem<T>(key: StorageKeys, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private static getItem<T>(key: StorageKeys): T | null {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null || storedValue === "undefined") return null;

    try {
      return JSON.parse(storedValue) as T;
    } catch (e) {
      console.error(`Error parsing ${key} from localStorage`, e);
      localStorage.removeItem(key);
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }

  static keyExists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  static get AccessToken(): string | null {
    return this.getItem<string>(StorageKeys.AccessToken);
  }

  static set AccessToken(value: string | null) {
    this.setItem(StorageKeys.AccessToken, value);
  }

  static get CurrentUser(): User | null {
    return this.getItem<User>(StorageKeys.CurrentUser);
  }

  static set CurrentUser(value: User | null) {
    this.setItem(StorageKeys.CurrentUser, value);
  }
}
