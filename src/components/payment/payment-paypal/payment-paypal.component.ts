import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PaymentMethod, Status } from '../../../types/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StatusComponent } from '../../status/status.component';
import { validateInput } from '../../../lib/utils';
import { StepsService } from '../../../services/steps/steps.service';
import { BookingFormService } from '../../../services/booking-form/booking-form.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-payment-paypal',
  imports: [ReactiveFormsModule, MatIconModule, StatusComponent],
  templateUrl: './payment-paypal.component.html',
  styleUrl: './payment-paypal.component.scss',
})
export class PaymentPaypalComponent implements OnInit {
  @Input() mode: 'checkout' | 'profile' = 'checkout';
  @Output() close = new EventEmitter<void>();
  @Output() isStatus = new EventEmitter<boolean>();

  stepsService = inject(StepsService);
  bookingFormService = inject(BookingFormService);
  userService = inject(UserService);

  profileUser = this.userService.getUser();
  bookingFormUser = this.bookingFormService.getBookingFormUser();

  step = 0;
  savedPayments: PaymentMethod[] = [];

  form = new FormGroup({
    email: new FormControl(''),
  });

  touched = false;
  error = validateInput(
    { name: 'email', value: this.form.value.email },
    this.form.value
  );

  status: Status = {
    on: false,
    type: 'loading',
    action: {
      callback: () => {
        this.isStatus.emit(false);
        this.status.on = false;
        this.close.emit();
        this.bookingFormService.reset();
        this.stepsService.reset();
      },
    },
  };

  handleClose = () => {
    this.close.emit();
  };

  handleSelectPayment = (email: string) => {
    this.form.patchValue({
      email,
    });
    this.handleSubmit();
  };

  handleSubmit = () => {
    if (!this.error) {
      if (this.mode === 'checkout') {
        this.handleCheckout();
      } else if (this.mode === 'profile') {
        this.handleProfile();
      }
    } else {
      this.touched = true;
    }
  };

  handleProfile = () => {
    this.userService.addPaymentMethod({
      method: 'paypal',
      paypal: {
        email: this.form.value.email as string,
      },
    });
    this.isStatus.emit(true);
    this.status = {
      on: true,
      type: 'loading',
      message: 'Adding email to your profile',
      action: { callback: this.status.action.callback },
    };
    setTimeout(() => {
      this.status = {
        on: true,
        type: 'success',
        title: 'Email added successfully',
        message: 'You can now use this email to pay for your bookings',
        action: {
          callback: () => {
            this.isStatus.emit(false);
            this.status.on = false;
            this.close.emit();
          },
        },
      };
    }, 2000);
  };

  handleCheckout = () => {
    this.bookingFormService.setBookingFormPayment({
      method: 'paypal',
      paypal: {
        email: this.form.value.email as string,
      },
    });
    this.isStatus.emit(true);
    this.status = {
      on: true,
      type: 'loading',
      message: 'Processing payment',
      action: this.status.action,
    };
    this.bookingFormService.submit();
    setTimeout(() => {
      this.status = {
        on: true,
        type: 'success',
        title: 'Payment successful',
        message:
          'An email has been sent to your email address with the booking details',
        action: this.status.action,
      };
    }, 2000);
  };

  ngOnInit(): void {
    if (this.mode === 'checkout') {
      if (this.bookingFormUser) {
        this.form.patchValue({
          email: this.bookingFormUser.email,
        });
      }

      if (this.profileUser.data) {
        this.savedPayments = this.profileUser.data.paymentMethods.filter(
          (p) => p.method === 'paypal'
        );
      }

      if (!this.savedPayments.length) {
        this.step = 1;
      }
    } else if (this.mode === 'profile') {
      this.step = 1;
    }
  }

  constructor() {
    this.form.get('email')?.valueChanges.subscribe((value) => {
      this.error = validateInput({ name: 'email', value }, this.form.value);
    });
  }
}
