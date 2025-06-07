import { Component, inject, Input } from '@angular/core';
import rooms from '../../data/rooms.json';
import { RoomCardComponent } from '../roomCard/room-card/room-card.component';
import { Room } from '../../types/common';
import { QueryFormComponent } from '../queryForm/query-form/query-form.component';
import { MatIcon } from '@angular/material/icon';
import { StepsService } from '../../services/steps/steps.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LoadingRippleComponent } from '../loading-ripple/loading-ripple.component';

@Component({
  selector: 'app-results',
  imports: [
    RoomCardComponent,
    QueryFormComponent,
    MatIcon,
    FooterComponent,
    HeaderComponent,
    LoadingRippleComponent,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  @Input() isPage: boolean = false;
  results: Room[] | null = null;

  isLoading = true;

  stepsService = inject(StepsService);

  handleBack() {
    this.stepsService.back();
  }

  handleHome() {
    this.stepsService.reset();
  }

  fetchResults = () => {
    this.isLoading = true;
    setTimeout(() => {
      this.results = Object.values(rooms);
      this.isLoading = false;
    }, 2000);
  };

  constructor() {
    this.fetchResults();
  }
}
