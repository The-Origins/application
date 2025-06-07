import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentModalType } from '../../../types/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payment-add',
  imports: [MatIconModule],
  templateUrl: './payment-add.component.html',
  styleUrl: './payment-add.component.scss',
})
export class PaymentAddComponent {
  @Input() mode: 'checkout' | 'profile' = 'checkout';
  @Output() onClose = new EventEmitter<void>();
  @Output() isStatus = new EventEmitter<boolean>();
  @Output() switch = new EventEmitter<PaymentModalType>();

  handleSwitch(type: PaymentModalType) {
    this.switch.emit(type);
  }

  getPaymentMethodIcon(type: string) {
    switch (type) {
      case 'card':
        return 'card-payment.svg';
      case 'paypal':
        return 'paypal.svg';
      case 'mpesa':
        return 'mpesa.svg';
      default:
        return 'cash.svg';
    }
  }
}
