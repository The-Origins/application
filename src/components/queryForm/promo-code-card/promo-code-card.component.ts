import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QueryFormService } from '../../../services/query-form/query-form.service';
import { fadeIn } from '../../../animations';
import { validateInput } from '../../../lib/utils';

@Component({
  selector: 'app-promo-code-card',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './promo-code-card.component.html',
  styleUrl: './promo-code-card.component.scss',
  animations: [fadeIn],
})
export class PromoCodeCardComponent {
  queryForm = inject(QueryFormService).getForm();
  promoCode = new FormControl(this.queryForm.value.promoCode);

  open = false;

  handleClick() {
    this.open = !this.open;
  }

  handleApply() {
    if (this.promoCode.value) {
      this.queryForm.patchValue({
        promoCode: this.promoCode.value,
      });
      this.promoCode.reset();
    }
  }

  constructor() {
    //ensure safe input
    this.promoCode.valueChanges.subscribe((value) => {
      if (
        value &&
        validateInput({ name: 'safeInput', value }, {}, false, 20)
      ) {
        this.promoCode.setValue(this.queryForm.value.promoCode, {
          emitEvent: false,
        });
      }
    });
  }
}
