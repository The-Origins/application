import { Component, inject, Input } from '@angular/core';
import { Room } from '../../../types/common';
import { ImageComponentComponent } from '../image-component/image-component.component';
import { RatingComponent } from '../rating/rating.component';
import { CommonModule } from '@angular/common';
import { AmenitiesComponent } from '../amenities/amenities.component';
import { MatIconModule } from '@angular/material/icon';
import { StepsService } from '../../../services/steps/steps.service';
import { RoomService } from '../../../services/room/room.service';

@Component({
  selector: 'app-room-card',
  imports: [
    ImageComponentComponent,
    RatingComponent,
    CommonModule,
    AmenitiesComponent,
    MatIconModule,
  ],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
  @Input() room: Room | undefined;
  @Input() mode: 'snippet' | 'preview' | 'full' = 'preview';

  roomService = inject(RoomService);
  stepsService = inject(StepsService);

  handleExplore() {
    this.roomService.setRoom(this.room as Room);
    this.stepsService.next(`room`);
  }
  handleBook() {
    this.roomService.setRoom(this.room as Room);
    this.stepsService.next(`book`);
  }
}
