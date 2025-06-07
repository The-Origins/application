import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StatusComponent } from '../../status/status.component';
import {
  formatStringSpacing,
  removeStringSpacing,
  validateInput,
} from '../../../lib/utils';
import { PaymentMethod, Status } from '../../../types/common';
import { StepsService } from '../../../services/steps/steps.service';
import { BookingFormService } from '../../../services/booking-form/booking-form.service';
import { UserService } from '../../../services/user/user.service';
import { FormatStringSpacingPipe } from '../../../pipes/format-string-spacing.pipe';

@Component({
  selector: 'app-payment-card',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    StatusComponent,
    FormatStringSpacingPipe,
  ],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.scss',
})
export class PaymentCardComponent implements OnInit {
  @Input() mode: 'checkout' | 'profile' = 'checkout';
  @Output() close = new EventEmitter<void>();
  @Output() isStatus = new EventEmitter<boolean>();

  step = 0;

  stepsService = inject(StepsService);
  bookingFormService = inject(BookingFormService);
  userService = inject(UserService);

  profileUser = this.userService.getUser();
  profileUserCards: PaymentMethod[] = [];
  bookingFormUser = this.bookingFormService.getBookingFormUser();

  status: Status = {
    on: false,
    type: 'loading',
    action: {
      callback: () => {
        this.isStatus.emit(false);
        this.close.emit();
        this.status.on = false;
        this.bookingFormService.reset();
        this.stepsService.reset();
      },
    },
  };

  cardForm = new FormGroup({
    cardNumber: new FormControl(''),
    cardHolderName: new FormControl(''),
    cardExpirationDate: new FormControl(''),
    cardCvv: new FormControl(''),
  });

  errors = {
    cardNumber: 'required',
    cardHolderName: 'required',
    cardExpirationDate: 'required',
    cardCvv: 'required',
  };

  touched = {
    cardNumber: false,
    cardHolderName: false,
    cardExpirationDate: false,
    cardCvv: false,
  };

  handleBlur(event: Event) {
    const field = (event.target as HTMLInputElement).name;
    this.touched[field as keyof typeof this.touched] = true;
  }

  handleClose = () => {
    this.close.emit();
  };

  handleBack = () => {
    this.step = 0;
    this.cardForm.reset(
      {
        cardNumber: '',
        cardHolderName: '',
        cardExpirationDate: '',
        cardCvv: '',
      },
      { emitEvent: false }
    );
    this.errors = {
      cardNumber: 'required',
      cardHolderName: 'required',
      cardExpirationDate: 'required',
      cardCvv: 'required',
    };
    this.touched = {
      cardNumber: false,
      cardHolderName: false,
      cardExpirationDate: false,
      cardCvv: false,
    };
  };

  handleCardSelect = (card: {
    number: string;
    name: string;
    expiry: string;
  }) => {
    this.cardForm.patchValue({
      cardNumber: card.number,
      cardHolderName: card.name,
      cardExpirationDate: card.expiry,
      cardCvv: '',
    });
    this.step = 1;
    this.touched = {
      cardNumber: true,
      cardHolderName: true,
      cardExpirationDate: true,
      cardCvv: true,
    };
  };

  handleSubmit = () => {
    if (
      !this.errors.cardNumber &&
      !this.errors.cardHolderName &&
      !this.errors.cardExpirationDate &&
      !this.errors.cardCvv
    ) {
      if (this.mode === 'checkout') {
        this.handleCheckout();
      } else if (this.mode === 'profile') {
        this.handleProfile();
      }
    } else {
      this.touched = {
        cardNumber: true,
        cardHolderName: true,
        cardExpirationDate: true,
        cardCvv: true,
      };
    }
  };

  handleProfile = () => {
    this.userService.addPaymentMethod({
      method: 'card',
      card: {
        number: removeStringSpacing(
          this.cardForm.value.cardNumber || '',
          ' '
        ) as string,
        name: this.cardForm.value.cardHolderName as string,
        expiry: this.cardForm.value.cardExpirationDate as string,
        cvv: this.cardForm.value.cardCvv as string,
      },
    });

    this.isStatus.emit(true);
    this.status.on = true;
    this.status.message = 'Adding new card';
    this.bookingFormService.submit();
    //simulate payment processing
    setTimeout(() => {
      this.status = {
        on: true,
        type: 'success',
        title: 'Card added successfully',
        message: 'You can now use this card for your next booking',
        action: {
          callback: () => {
            this.isStatus.emit(false);
            this.close.emit();
            this.status.on = false;
          },
        },
      };
    }, 3000);
  };

  handleCheckout = () => {
    this.bookingFormService.setBookingFormPayment({
      method: 'card',
      card: {
        number: this.cardForm.value.cardNumber as string,
        name: this.cardForm.value.cardHolderName as string,
        expiry: this.cardForm.value.cardExpirationDate as string,
        cvv: this.cardForm.value.cardCvv as string,
      },
    });

    this.isStatus.emit(true);
    this.status.on = true;
    this.status.message = 'Processing payment...';
    this.bookingFormService.submit();
    //simulate payment processing
    setTimeout(() => {
      this.status.on = true;
      this.status.title = 'Payment successful';
      this.status.message = 'An email has been sent with your booking details';
      this.status.type = 'success';
    }, 3000);
  };

  handleStatusClick = () => {
    this.isStatus.emit(false);
    this.close.emit();
    this.status.on = false;
    this.stepsService.reset();
  };

  ngOnInit(): void {
    this.profileUserCards =
      this.profileUser.data?.paymentMethods.filter(
        (method) => method.method === 'card'
      ) || [];

    if (!this.profileUserCards.length) {
      this.step = 1;
    }

    if (this.mode === 'checkout' && this.bookingFormUser) {
      this.cardForm
        .get('cardHolderName')
        ?.patchValue(
          this.bookingFormUser.firstName + ' ' + this.bookingFormUser.lastName,
          { emitEvent: false }
        );
      this.errors.cardHolderName = '';
    } else if (this.mode === 'profile' && this.profileUser.data) {
      this.cardForm
        .get('cardHolderName')
        ?.patchValue(
          this.profileUser.data.name.first +
            ' ' +
            this.profileUser.data.name.last,
          { emitEvent: false }
        );
      this.errors.cardHolderName = '';
    }
  }

  constructor() {
    this.cardForm.get('cardNumber')?.valueChanges.subscribe((value) => {
      const formattedValue = formatStringSpacing(value || '', 4, ' ');
      if (formattedValue !== value) {
        this.cardForm
          .get('cardNumber')
          ?.setValue(formattedValue, { emitEvent: false });
      }
      this.errors.cardNumber = validateInput(
        { name: 'cardNumber', value: removeStringSpacing(value || '', ' ') },
        this.cardForm.value
      );
    });
    this.cardForm.get('cardExpirationDate')?.valueChanges.subscribe((value) => {
      const formattedValue = formatStringSpacing(value || '', 2, '/');
      if (formattedValue !== value) {
        this.cardForm
          .get('cardExpirationDate')
          ?.setValue(formattedValue, { emitEvent: false });
      }

      this.errors.cardExpirationDate = validateInput(
        { name: 'cardExpirationDate', value: value },
        this.cardForm.value
      );
    });
    this.cardForm.get('cardHolderName')?.valueChanges.subscribe((value) => {
      this.errors.cardHolderName = validateInput(
        { name: 'cardHolderName', value: value },
        this.cardForm.value
      );
    });
    this.cardForm.get('cardCvv')?.valueChanges.subscribe((value) => {
      this.errors.cardCvv = validateInput(
        { name: 'cardCvv', value: value },
        this.cardForm.value
      );
    });
  }
}
