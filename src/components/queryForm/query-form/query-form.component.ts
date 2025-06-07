import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PersonsCardComponent } from '../persons-card/persons-card.component';
import { DateRangeCardsComponent } from '../date-range-cards/date-range-cards.component';
import { BoardTypeBtnGroupComponent } from '../board-type-btn-group/board-type-btn-group.component';
import { PromoCodeCardComponent } from '../promo-code-card/promo-code-card.component';
import { CommonModule } from '@angular/common';
import { QueryFormService } from '../../../services/query-form/query-form.service';
import { MatIconModule } from '@angular/material/icon';
import { fadeInOut, leftIn } from '../../../animations';

@Component({
  selector: 'app-query-form',
  imports: [
    PersonsCardComponent,
    DateRangeCardsComponent,
    CommonModule,
    BoardTypeBtnGroupComponent,
    PromoCodeCardComponent,
    MatIconModule,
  ],
  templateUrl: './query-form.component.html',
  styleUrl: './query-form.component.scss',
  animations: [fadeInOut, leftIn],
})
export class QueryFormComponent {
  @Output() onSubmit = new EventEmitter<void>();

  queryForm = inject(QueryFormService).getForm();

  handleSubmit() {
    this.onSubmit.emit();
  }
}
