import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Status } from '../../../types/common';
import { StatusComponent } from '../../status/status.component';
import { BookingFormService } from '../../../services/booking-form/booking-form.service';
import { StepsService } from '../../../services/steps/steps.service';

@Component({
  selector: 'app-payment-cash',
  imports: [StatusComponent],
  templateUrl: './payment-cash.component.html',
  styleUrl: './payment-cash.component.scss',
})
export class PaymentCashComponent implements OnInit {
  @Input() mode: 'checkout' | 'profile' = 'checkout';
  @Output() close = new EventEmitter<void>();
  @Output() isStatus = new EventEmitter<boolean>();

  stepsService = inject(StepsService);
  bookingFormService = inject(BookingFormService);

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

  handleSubmit = () => {
    this.bookingFormService.setBookingFormPayment({
      method: 'cash',
    });

    this.isStatus.emit(true);
    this.status.on = true;
    this.status.type = 'loading';
    this.status.message = 'Submitting booking form';
    this.bookingFormService.submit();
    setTimeout(() => {
      this.status.on = true;
      this.status.type = 'success';
      this.status.title = 'Booking submitted successfully';
      this.status.message =
        'An email has been sent to your email address with the booking details, payment will be done on arrival';
    }, 3000);
  };

  ngOnInit() {
    setTimeout(() => {
      this.handleSubmit();
    }, 0);
  }
}
