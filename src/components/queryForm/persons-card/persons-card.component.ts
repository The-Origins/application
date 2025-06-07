import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { QueryFormService } from '../../../services/query-form/query-form.service';
import { fadeIn } from '../../../animations';

@Component({
  selector: 'app-persons-card',
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './persons-card.component.html',
  styleUrl: './persons-card.component.scss',
  animations: [fadeIn],
})
export class PersonsCardComponent {
  @Input() type: 'adults' | 'children' = 'adults';

  queryForm = inject(QueryFormService).getForm();
  open = false;

  changesForm = new FormGroup({
    adults: new FormControl<number | null | undefined>(
      this.queryForm.value.adults
    ),
    children: new FormControl<number | null | undefined>(
      this.queryForm.value.children
    ),
    infants: new FormControl<number | null | undefined>(
      this.queryForm.value.infants
    ),
  });

  handleSubmit() {
    if (this.type === 'adults') {
      if (
        this.changesForm.value.adults &&
        Number(this.changesForm.value.adults) > 0
      ) {
        this.queryForm.patchValue({
          adults: this.changesForm.value.adults,
        });
      }
    } else if (this.type === 'children') {
      if (
        (this.changesForm.value.children !== null &&
          this.changesForm.value.children !== undefined) ||
        (this.changesForm.value.infants !== null &&
          this.changesForm.value.infants !== undefined)
      ) {
        this.queryForm.patchValue({
          children: this.changesForm.value.children,
          infants: this.changesForm.value.infants,
        });
      }
    }
    this.open = false;
  }

  handleClick() {
    this.open = !this.open;
  }

  decrement(type: 'adults' | 'children' | 'infants') {
    if (type === 'adults' && this.changesForm.value[type] === 1) {
      return;
    }
    if (this.changesForm.value[type] && this.changesForm.value[type] >= 0) {
      this.changesForm.patchValue({
        [type]: Number(this.changesForm.value[type]) - 1,
      });
    }
  }

  increment(type: 'adults' | 'children' | 'infants') {
    if (
      this.changesForm.value[type] !== null &&
      this.changesForm.value[type] !== undefined &&
      this.changesForm.value[type] < 100
    ) {
      this.changesForm.patchValue({
        [type]: Number(this.changesForm.value[type]) + 1,
      });
    }
  }

  constructor() {
    //only allow numbers, replace non-numbers with null, allow values >= 0, allow values < 100
    this.changesForm.get('adults')?.valueChanges.subscribe((value) => {
      if (
        (value && isNaN(Number(value))) ||
        Number(value) < 0 ||
        Number(value) > 100
      ) {
        this.changesForm
          .get('adults')
          ?.setValue(this.queryForm.value.adults, { emitEvent: false });
      }
    });
    this.changesForm.get('children')?.valueChanges.subscribe((value) => {
      if (
        (value && isNaN(Number(value))) ||
        Number(value) < 0 ||
        Number(value) > 100
      ) {
        this.changesForm
          .get('children')
          ?.setValue(this.queryForm.value.children, { emitEvent: false });
      }
    });
    this.changesForm.get('infants')?.valueChanges.subscribe((value) => {
      if (
        (value && isNaN(Number(value))) ||
        Number(value) < 0 ||
        Number(value) > 100
      ) {
        this.changesForm
          .get('infants')
          ?.setValue(this.queryForm.value.infants, { emitEvent: false });
      }
    });
  }
}
