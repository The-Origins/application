import { Injectable } from '@angular/core';
import { Room } from '../../types/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private room = new BehaviorSubject<Room | null>(null);

  room$ = this.room.asObservable();

  getRoom(): Room | null {
    return this.room.getValue();
  }

  setRoom(room: Room): void {
    this.room.next(room);
  }

  reset(): void {
    this.room.next(null);
  }
}
