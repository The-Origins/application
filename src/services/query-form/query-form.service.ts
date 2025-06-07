import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class QueryFormService {
  queryForm = new FormGroup({
    checkIn: new FormControl(new Date()),
    checkOut: new FormControl(
      new Date(new Date().setDate(new Date().getDate() + 1))
    ),
    location: new FormControl('all'),
    boardType: new FormControl('bed and breakfast'),
    adults: new FormControl<number | null | undefined>(1),
    children: new FormControl<number | null | undefined>(0),
    infants: new FormControl<number | null | undefined>(0),
    promoCode: new FormControl(''),
  });

  getForm(): FormGroup {
    return this.queryForm;
  }

  reset() {
    this.queryForm.reset();
  }
}
