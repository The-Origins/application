import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StepsService } from '../../services/steps/steps.service';
import { BookingFormService } from '../../services/booking-form/booking-form.service';
import { CommonModule } from '@angular/common';
import { dateDifferenceInDays, validateInput } from '../../lib/utils';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CountrySelectComponent } from '../country-select/country-select.component';
import { PaymentModalComponent } from '../payment/payment-modal/payment-modal.component';
import { PaymentModalType } from '../../types/common';
import { UserService } from '../../services/user/user.service';
import { fadeInOut, bottomIn } from '../../animations';
@Component({
  selector: 'app-checkout',
  imports: [
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    CountrySelectComponent,
    PaymentModalComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  animations: [fadeInOut, bottomIn],
})
export class CheckoutComponent implements OnInit {
  stepsService = inject(StepsService);
  bookingFormService = inject(BookingFormService);
  userService = inject(UserService);
  profileUser = this.userService.getUser();
  bookingForm = this.bookingFormService.getForm();

  paymentModalType: PaymentModalType = null;

  errors = {
    firstName: 'required',
    lastName: 'required',
    email: 'required',
    phone: 'required',
    country: 'select a country from the list',
    city: 'required',
    requests: '',
  };

  touched = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    city: false,
    country: false,
    requests: false,
  };

  userDetailsForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
  });

  requests = new FormControl('');

  nights = dateDifferenceInDays(
    this.bookingForm.checkIn,
    this.bookingForm.checkOut
  );

  handleCountrySelect = (country: string) => {
    this.userDetailsForm.get('country')!.setValue(country);
    this.errors.country = '';
  };

  handleBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    const field = input.name;
    this.touched[field as keyof typeof this.touched] = true;
  }

  handleCountryBlur = () => {
    this.touched.country = true;
  };

  handleHome() {
    this.stepsService.reset();
  }
  handleBack() {
    this.stepsService.back();
  }

  handlePayment(type: 'card' | 'paypal' | 'mpesa' | 'cash') {
    if (
      !this.errors.firstName &&
      !this.errors.lastName &&
      !this.errors.email &&
      !this.errors.phone &&
      !this.errors.country &&
      !this.errors.city &&
      !this.errors.requests
    ) {
      this.bookingFormService.setBookingFormUser({
        firstName: this.userDetailsForm.value.firstName as string,
        lastName: this.userDetailsForm.value.lastName as string,
        email: this.userDetailsForm.value.email as string,
        phone: this.userDetailsForm.value.phone as string,
        country: this.userDetailsForm.value.country as string,
        city: this.userDetailsForm.value.city as string,
      });
      this.paymentModalType = type;
    } else {
      this.touched.firstName = true;
      this.touched.lastName = true;
      this.touched.email = true;
      this.touched.phone = true;
      this.touched.country = true;
      this.touched.city = true;
      this.touched.requests = true;
    }
  }

  handlePaymentClose = () => {
    this.paymentModalType = null;
  };

  ngOnInit(): void {
    if (this.profileUser && this.profileUser.data) {
      this.userDetailsForm.patchValue({
        firstName: this.profileUser.data.name.first,
        lastName: this.profileUser.data.name.last,
        email: this.profileUser.data.email,
        phone: this.profileUser.data.phone,
        country: this.profileUser.data.country,
        city: this.profileUser.data.city,
      });

      this.errors = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        requests: '',
      };
    }
  }

  constructor() {
    this.userDetailsForm.get('firstName')?.valueChanges.subscribe((value) => {
      this.errors.firstName = validateInput(
        { name: 'name', value },
        this.userDetailsForm.value,
        true,
        30,
        2
      );
    });
    this.userDetailsForm.get('lastName')?.valueChanges.subscribe((value) => {
      this.errors.lastName = validateInput(
        { name: 'name', value },
        this.userDetailsForm.value,
        true,
        30,
        2
      );
    });
    this.userDetailsForm.get('email')?.valueChanges.subscribe((value) => {
      this.errors.email = validateInput(
        { name: 'email', value },
        this.userDetailsForm.value
      );
    });
    this.userDetailsForm.get('country')?.valueChanges.subscribe((value) => {
      this.errors.phone = validateInput(
        { name: 'phone', value: this.userDetailsForm.value.phone },
        { ...this.userDetailsForm.value, country: value }
      );
    });
    this.userDetailsForm.get('phone')?.valueChanges.subscribe((value) => {
      this.errors.phone = validateInput(
        { name: 'phone', value },
        this.userDetailsForm.value
      );
    });
    this.userDetailsForm.get('city')?.valueChanges.subscribe((value) => {
      this.errors.city = validateInput(
        { name: 'safeInput', value },
        this.userDetailsForm.value
      );
    });

    this.requests.valueChanges.subscribe((value) => {
      this.errors.requests = validateInput(
        { name: 'safeInput', value },
        {},
        false,
        200
      );
    });
  }
}
