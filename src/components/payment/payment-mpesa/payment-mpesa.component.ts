import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PaymentMethod, Status } from '../../../types/common';
import { MatIconModule } from '@angular/material/icon';
import { StatusComponent } from '../../status/status.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { validateInput } from '../../../lib/utils';
import { StepsService } from '../../../services/steps/steps.service';
import { BookingFormService } from '../../../services/booking-form/booking-form.service';
import { UserService } from '../../../services/user/user.service';
@Component({
  selector: 'app-payment-mpesa',
  imports: [MatIconModule, StatusComponent, ReactiveFormsModule],
  templateUrl: './payment-mpesa.component.html',
  styleUrl: './payment-mpesa.component.scss',
})
export class PaymentMpesaComponent implements OnInit {
  @Input() mode: 'checkout' | 'profile' = 'checkout';
  @Output() close = new EventEmitter<void>();
  @Output() isStatus = new EventEmitter<boolean>();

  balanceId: string = '';

  stepsService = inject(StepsService);
  bookingFormService = inject(BookingFormService);
  userService = inject(UserService);

  profileUser = this.userService.getUser();
  bookingFormUser = this.bookingFormService.getBookingFormUser();

  step = 0;
  savedPayments: PaymentMethod[] = [];

  status: Status = {
    on: false,
    type: 'loading',
    action: {
      callback: () => {
        this.isStatus.emit(false);
        this.close.emit();
        this.stepsService.reset();
        this.bookingFormService.reset();
      },
    },
  };

  form = new FormGroup({
    code: new FormControl(''),
    phone: new FormControl(''),
    country: new FormControl('Kenya'),
  });

  errors = {
    code: 'required',
    phone: validateInput(
      { name: 'phone', value: this.form.value.phone },
      this.form.value
    ),
  };

  touched = {
    code: false,
    phone: false,
  };

  handleBlur = (field: string) => {
    this.touched[field as keyof typeof this.touched] = true;
  };

  handleClose = () => {
    this.close.emit();
  };

  handleCancel = () => {
    this.step = 1;
  };

  handleVerifyCode = () => {
    if (!this.errors.code) {
      this.bookingFormService.setBookingFormPayment({
        method: 'mpesa',
        mpesa: {
          code: this.form.value.code as string,
        },
      });
      this.isStatus.emit(true);
      this.status = {
        on: true,
        type: 'loading',
        message: 'Verifying code',
        action: {
          callback: this.status.action.callback,
        },
      };
      this.bookingFormService.submit();
      setTimeout(() => {
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
          this.status = {
            on: true,
            type: 'success',
            title: 'Payment successful',
            message:
              'An email has been sent to your email address with the booking details',
            action: this.status.action,
          };
        } else {
          this.balanceId = '1234567890';
          this.status = {
            on: true,
            type: 'warning',
            title: 'Payment insufficient',
            message: 'Your pending balance is Ksh. 1,000',
            action: {
              title: 'pay balance',
              callback: () => {
                this.isStatus.emit(false);
                this.status.on = false;
                this.step = 0;
              },
            },
          };
        }
      }, 3000);
    }
  };

  handleSelectPayment = (number: string) => {
    this.form.get('phone')?.setValue(number);
    this.handleRequest();
  };

  handleRequest = () => {
    if (!this.errors.phone) {
      if (this.mode === 'profile') {
        this.handleAddPhone();
      } else {
        this.handleSendRequest();
      }
    } else {
      this.touched.phone = true;
    }
  };

  handleAddPhone = () => {
    this.userService.addPaymentMethod({
      method: 'mpesa',
      mpesa: {
        number: this.form.value.phone as string,
      },
    });

    this.isStatus.emit(true);
    this.status = {
      on: true,
      type: 'loading',
      message: 'Adding phone number',
      action: this.status.action,
    };
    setTimeout(() => {
      this.status = {
        on: true,
        type: 'success',
        title: 'Phone number added',
        message: 'You can now use this phone number to pay for your bookings',
        action: {
          callback: () => {
            this.isStatus.emit(false);
            this.status.on = false;
            this.close.emit();
          },
        },
      };
    }, 3000);
  };

  handleSendRequest = () => {
    this.bookingFormService.setBookingFormPayment({
      method: 'mpesa',
      mpesa: {
        number: this.form.value.phone as string,
      },
    });
    this.isStatus.emit(true);
    this.status = {
      on: true,
      type: 'loading',
      message: 'Awaiting payment',
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
    }, 3000);
  };

  ngOnInit(): void {
    if (this.mode === 'profile') {
      this.step = 3;
    } else if (this.mode === 'checkout') {
      this.form.get('phone')?.setValue(this.bookingFormUser?.phone || '');
      if (this.profileUser.data) {
        this.savedPayments = this.profileUser.data?.paymentMethods.filter(
          (p) => p.method === 'mpesa'
        );
      }

      if (!this.savedPayments.length) {
        this.step = 1;
      }
    }
  }

  constructor() {
    this.form.get('code')?.valueChanges.subscribe((value) => {
      const formattedValue = value?.toUpperCase();

      if (value !== formattedValue) {
        this.form.get('code')?.setValue(formattedValue as string, {
          emitEvent: false,
        });
      }

      this.errors.code = validateInput(
        { name: 'mpesaCode', value: formattedValue },
        this.form.value,
        true,
        10,
        10
      );
    });
    this.form.get('phone')?.valueChanges.subscribe((value) => {
      this.errors.phone = validateInput(
        { name: 'phone', value },
        this.form.value
      );
    });
  }
}
