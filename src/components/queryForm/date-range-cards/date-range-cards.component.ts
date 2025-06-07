import { Component, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { QueryFormService } from '../../../services/query-form/query-form.service';

@Component({
  selector: 'app-date-range-cards',
  imports: [MatDatepickerModule, ReactiveFormsModule, DatePipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-range-cards.component.html',
  styleUrl: './date-range-cards.component.scss',
})
export class DateRangeCardsComponent {
  queryForm = inject(QueryFormService).getForm();
}
