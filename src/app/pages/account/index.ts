import { Component, OnInit } from "@angular/core";
import { InputText } from "primeng/inputtext";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "@/layout/service/auth.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { LocalStorageService } from "@/layout/service/local-storage.service";
import { ApiService } from "@/layout/service/api.service";

type EditableField = "username" | "email" | "phoneNumber";

@Component({
  selector: "account",
  standalone: true,
  imports: [CommonModule, InputText, ReactiveFormsModule],
  template: `
    <div
      class="p-6 md:p-12 rounded-2.5xl lg:rounded-4xl bg-white/16 backdrop-blur-[48px] max-w-[calc(100%-3rem)] lg:max-w-none mx-auto shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
    >
    <div class="p-6 md:p-12 rounded-2.5xl lg:rounded-4xl ...">
  <div *ngIf="loading" class="text-center p-8 text-surface-300">
    <i class="pi pi-spinner pi-spin"></i>
    Loading account details...
  </div>

  <div *ngIf="error && !loading" class="text-red-400 p-4 mb-4 rounded-lg">
    {{ error }}
  </div>

      <form [formGroup]="accountForm" (ngSubmit)="onSubmit()">
        <div class="py-10 border-b border-white/12 flex flex-col gap-10">
          <div class="flex flex-col sm:flex-row gap-2 items-start">
            <div class="sm:flex-[0.45] text-lg text-surface-0 font-medium">
              Username
            </div>
            <div class="sm:flex-[0.55] w-full flex gap-2">
              <input
                pInputText
                fluid
                formControlName="username"
                [disabled]="!editing.username"
                class="!px-5 !py-3 !bg-white/16 !rounded-full outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
              />
              <button
                type="button"
                class="text-surface-0 hover:text-surface-200"
                (click)="toggleEdit('username')"
              >
                {{ editing.username ? "Cancel" : "Edit" }}
              </button>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 items-start">
            <div class="sm:flex-[0.45] text-lg text-surface-0 font-medium">
              Email
            </div>
            <div class="sm:flex-[0.55] w-full flex gap-2">
              <input
                pInputText
                fluid
                formControlName="email"
                [disabled]="!editing.email"
                class="!px-5 !py-3 !bg-white/16 !rounded-full outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
              />
              <button
                type="button"
                class="text-surface-0 hover:text-surface-200"
                (click)="toggleEdit('email')"
              >
                {{ editing.email ? "Cancel" : "Edit" }}
              </button>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 items-start">
            <div class="sm:flex-[0.45] text-lg text-surface-0 font-medium">
              Phone Number
            </div>
            <div class="sm:flex-[0.55] w-full flex gap-2">
              <input
                pInputText
                fluid
                formControlName="phoneNumber"
                [disabled]="!editing.phoneNumber"
                class="!px-5 !py-3 !bg-white/16 !rounded-full outline-none !text-white/90 backdrop-blur-[48px] !border-white/12 placeholder:!text-surface-0/60 !shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
              />
              <button
                type="button"
                class="text-surface-0 hover:text-surface-200"
                (click)="toggleEdit('phoneNumber')"
              >
                {{ editing.phoneNumber ? "Cancel" : "Edit" }}
              </button>
            </div>
          </div>
        </div>

        <div class="pt-10 flex justify-end gap-4">
          <button
            type="submit"
            class="button-regular px-5 py-3 min-w-40"
            [disabled]="!isFormChanged()"
          >
            Save Changes
          </button>
          <button
            type="button"
            class="px-5 py-3 min-w-40 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-full transition-colors"
            (click)="authService.logout()"
          >
            Log Out
          </button>
        </div>
      </form>
    </div>
  `,
})
export class Account implements OnInit {
  accountForm: FormGroup;
  editing = {
    username: false,
    email: false,
    phoneNumber: false,
  };
  loading = true;
  error: string | null = null;
  originalUser: any = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public authService: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.accountForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phoneNumber: [{ value: '', disabled: true }, Validators.pattern(/^[0-9]{10}$/)]
    });
  }

  ngOnInit() {
    this.initializeUser();
  }

  private initializeUser() {
    const user = LocalStorageService.CurrentUser;
    if (!user) {
      this.handleUnauthenticated();
      return;
    }
    this.originalUser = { ...user };
    this.fetchUserDetails(user.id);
  }

  private fetchUserDetails(userId: string) {
    console.log('Fetching user details for userId:', userId);
    this.apiService.getUserDetails().subscribe({
      next: (data) => {
        console.log('User details fetched successfully:', data);
        this.handleDataSuccess(data);
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
        this.handleDataError(err);
      }
    });
  }

  private handleUnauthenticated() {
    this.error = 'Please log in to view account details';
    this.loading = false;
    this.router.navigate(['/signin']);
  }

  private handleDataSuccess(data: any) {
    this.accountForm.patchValue({
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber
    });
    this.originalUser = {
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber
    };
    this.loading = false;
  }

  private handleDataError(error: any) {
    console.error('API Error:', error);
    this.loading = false;

    const localUser = LocalStorageService.CurrentUser;
    if (localUser) {
      this.accountForm.patchValue({
        username: localUser.username,
        email: localUser.email,
        phoneNumber: localUser.phoneNumber
      });
      this.error = 'Showing locally stored data - connection issues detected';
    } else {
      this.error = 'Failed to load account details';
      this.router.navigate(['/signin']);
    }
  }

  toggleEdit(field: EditableField) {
    this.editing[field] = !this.editing[field];
    const control = this.accountForm.get(field);

    if (control) {
      if (this.editing[field]) {
        control.enable();
      } else {
        if (control.dirty) {
          const user = LocalStorageService.CurrentUser;
          if (user) {
            control.patchValue(user[field]);
          }
          control.markAsPristine();
        }
        control.disable();
      }
    }
  }

  onSubmit() {
    const user = LocalStorageService.CurrentUser;
    if (user) {
      this.apiService.updateUserDetails(this.accountForm.value).subscribe({
        next: () => {
          const updatedUser = { ...user, ...this.accountForm.value };
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
          this.authService.updateCurrentUser(updatedUser);

          Object.keys(this.editing).forEach((field: string) => {
            this.accountForm.get(field)?.disable();
            this.editing[field as EditableField] = false;
          });

          this.accountForm.markAsPristine();
        },
        error: (err) => console.error("Error updating user:", err),
      });
    }
  }

  private resetEditing() {
    this.editing = {
      username: false,
      email: false,
      phoneNumber: false,
    };
  }

  isFormChanged(): boolean {
    return (
      this.editing.username || this.editing.email || this.editing.phoneNumber
    ) && (
        this.accountForm.value.username !== this.originalUser.username ||
        this.accountForm.value.email !== this.originalUser.email ||
        this.accountForm.value.phoneNumber !== this.originalUser.phoneNumber
      );
  }
}
