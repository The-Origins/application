import { Component, inject } from '@angular/core';
import { UserService, UserServiceUser } from '../../services/user/user.service';
import { FormControl } from '@angular/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentModalComponent } from '../payment/payment-modal/payment-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { CountrySelectComponent } from '../country-select/country-select.component';
import { RedactStringPipe } from '../../pipes/redact-string.pipe';
import { StepsService } from '../../services/steps/steps.service';
import { validateInput } from '../../lib/utils';
import { PaymentModalType } from '../../types/common';
import { fadeInOut, bottomIn, leftIn } from '../../animations';
import { LoadingRippleComponent } from "../loading-ripple/loading-ripple.component";
@Component({
  selector: 'app-profile',
  imports: [
    PaymentModalComponent,
    ReactiveFormsModule,
    MatIconModule,
    CountrySelectComponent,
    RedactStringPipe,
    LoadingRippleComponent
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  animations: [fadeInOut, bottomIn, leftIn],
})
export class ProfileComponent {
  paymentModalType: PaymentModalType = null;

  userService = inject(UserService);
  stepService = inject(StepsService);

  user: UserServiceUser | null = null;

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
  });

  errors = {
    firstName: 'required',
    lastName: 'required',
    email: 'required',
    phone: 'required',
    country: 'required',
    city: 'required',
  };

  touched = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    country: false,
    city: false,
  };

  changed = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    country: false,
    city: false,
  };

  handleCountrySelect(country: string) {
    this.userForm.patchValue({
      country: country,
    });
  }

  handleBlur(field: string) {
    this.touched[field as keyof typeof this.touched] = true;
  }

  getPaymentMethodIcon(type: string) {
    switch (type) {
      case 'card':
        return 'assets/card-payment.svg';
      case 'paypal':
        return 'assets/paypal.svg';
      case 'mpesa':
        return 'assets/mpesa.svg';
      default:
        return 'assets/cash.svg';
    }
  }

  handleAddPaymentMethod() {
    this.paymentModalType = 'add';
  }
  handleDeletePaymentMethod(index: number) {
    this.userService.removePaymentMethod(index);
  }

  handleSubmit() {
    if (
      !this.errors.firstName &&
      !this.errors.lastName &&
      !this.errors.email &&
      !this.errors.phone &&
      !this.errors.country &&
      !this.errors.city &&
      (this.changed.firstName ||
        this.changed.lastName ||
        this.changed.email ||
        this.changed.phone ||
        this.changed.country ||
        this.changed.city)
    ) {
      this.userService.updateUser({
        name: {
          first: this.userForm.value.firstName as string,
          last: this.userForm.value.lastName as string,
        },
        email: this.userForm.value.email as string,
        phone: this.userForm.value.phone as string,
        country: this.userForm.value.country as string,
        city: this.userForm.value.city as string,
      });
    }
  }

  handleLogout() {
    this.userService.logout();
  }

  handleBack() {
    this.stepService.back();
  }

  handleHome() {
    this.stepService.reset();
  }

  constructor() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      if (user && user.data) {
        this.userForm.patchValue(
          {
            firstName: user.data.name.first,
            lastName: user.data.name.last,
            email: user.data.email,
            phone: user.data.phone,
            country: user.data.country,
            city: user.data.city,
          },
          { emitEvent: false }
        );

        this.errors = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          city: '',
        };

        this.changed = {
          firstName: false,
          lastName: false,
          email: false,
          phone: false,
          country: false,
          city: false,
        };
      }
    });

    this.userForm.get('firstName')?.valueChanges.subscribe((value) => {
      this.changed.firstName = value !== this.user?.data?.name.first;
      this.errors.firstName = validateInput(
        { name: 'name', value },
        this.userForm.value,
        true,
        30,
        2
      );
    });
    this.userForm.get('lastName')?.valueChanges.subscribe((value) => {
      this.changed.lastName = value !== this.user?.data?.name.last;
      this.errors.lastName = validateInput(
        { name: 'name', value },
        this.userForm.value,
        true,
        30,
        2
      );
    });
    this.userForm.get('email')?.valueChanges.subscribe((value) => {
      this.changed.email = value !== this.user?.data?.email;
      this.errors.email = validateInput(
        { name: 'email', value },
        this.userForm.value
      );
    });
    this.userForm.get('country')?.valueChanges.subscribe((value) => {
      this.changed.country = value !== this.user?.data?.country;
      this.errors.phone = validateInput(
        { name: 'phone', value: this.userForm.value.phone },
        { ...this.userForm.value, country: value }
      );
      this.touched.phone = true;
    });
    this.userForm.get('phone')?.valueChanges.subscribe((value) => {
      this.changed.phone = value !== this.user?.data?.phone;
      this.errors.phone = validateInput(
        { name: 'phone', value },
        this.userForm.value
      );
    });
    this.userForm.get('city')?.valueChanges.subscribe((value) => {
      this.changed.city = value !== this.user?.data?.city;
      this.errors.city = validateInput(
        { name: 'safeInput', value },
        this.userForm.value
      );
    });
  }
}
