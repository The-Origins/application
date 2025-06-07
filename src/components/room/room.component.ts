import { Component, inject } from '@angular/core';
import rooms from '../../data/rooms.json';
import { Room } from '../../types/common';
import { MatIconModule } from '@angular/material/icon';
import { QueryFormComponent } from '../queryForm/query-form/query-form.component';
import { RoomCardComponent } from '../roomCard/room-card/room-card.component';
import { StepsService } from '../../services/steps/steps.service';
import { fadeInOut, bottomIn } from '../../animations';
import { RoomService } from '../../services/room/room.service';

@Component({
  selector: 'app-room',
  imports: [MatIconModule, QueryFormComponent, RoomCardComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
  animations: [fadeInOut, bottomIn],
})
export class RoomComponent {
  roomService = inject(RoomService);

  room: Room | null = this.roomService.getRoom();
  similarRooms: Room[] = [];
  similarRoomsIndex = 0;

  stepService = inject(StepsService);

  handleBack() {
    this.stepService.back();
  }

  handleHome() {
    this.stepService.reset();
  }

  nextSimilarRoom() {
    if (this.similarRoomsIndex < this.similarRooms.length - 1) {
      this.similarRoomsIndex++;
    } else {
      this.similarRoomsIndex = 0;
    }
  }

  previousSimilarRoom() {
    if (this.similarRoomsIndex > 0) {
      this.similarRoomsIndex--;
    } else {
      this.similarRoomsIndex = this.similarRooms.length - 1;
    }
  }

  goToResultsPage() {
    this.stepService.next('results');
  }

  constructor() {
    this.roomService.room$.subscribe((room) => {
      this.room = room;
      this.similarRooms = Object.values(rooms).filter((r) => r.id !== room?.id);
      window.scrollTo({
        top: 0,
      });
    });
  }
}
