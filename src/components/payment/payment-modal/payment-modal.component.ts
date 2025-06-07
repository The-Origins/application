import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCardComponent } from '../payment-card/payment-card.component';
import { PaymentPaypalComponent } from '../payment-paypal/payment-paypal.component';
import { PaymentMpesaComponent } from '../payment-mpesa/payment-mpesa.component';
import { PaymentCashComponent } from '../payment-cash/payment-cash.component';
import { MatIconModule } from '@angular/material/icon';
import { PaymentModalType } from '../../../types/common';
import { PaymentAddComponent } from '../payment-add/payment-add.component';

@Component({
  selector: 'app-payment-modal',
  imports: [
    CommonModule,
    PaymentCardComponent,
    PaymentPaypalComponent,
    PaymentMpesaComponent,
    PaymentCashComponent,
    MatIconModule,
    PaymentAddComponent,
  ],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss',
})
export class PaymentModalComponent {
  @Input() mode: 'checkout' | 'profile' = 'checkout';
  @Input() type: PaymentModalType = null;
  @Output() onClose = new EventEmitter<void>();

  isStatus = false;

  handleSwitchType(type: PaymentModalType) {
    this.type = type;
    this.isStatus = false;
  }
}
