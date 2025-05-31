import { Message } from "./message";
export enum UserRole {
  User = "user",
  Owner = "owner",
  Admin = "admin",
}

export enum AuthFields {
  Email = "email",
  Password = "password",
  IUser = "iuser",
  Users = "users",
}
export interface User {
  id: string;
  email: string;
  username: string;
  phoneNumber: number;
  role: UserRole;
  exp?: number;
  isBlocked: boolean;
  venueCount?: number;
}
