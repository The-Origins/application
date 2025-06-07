import { Component, inject, Input } from '@angular/core';
import {
  BookingFormData,
  BookingFormRoom,
  BookingFormService,
} from '../../services/booking-form/booking-form.service';
import { MatIcon } from '@angular/material/icon';
import { Room, RoomTypes } from '../../types/common';
import { CommonModule } from '@angular/common';
import { ClickAwayDirective } from '../../directives/click-away.directive';
import { topDownGrow, fadeInOut, leftIn, leftOut } from '../../animations';

@Component({
  selector: 'app-booking-room',
  imports: [MatIcon, CommonModule, ClickAwayDirective],
  templateUrl: './booking-room.component.html',
  styleUrl: './booking-room.component.scss',
  animations: [topDownGrow, fadeInOut, leftIn, leftOut],
})
export class BookingRoomComponent {
  @Input() room: Partial<Room> | undefined;
  @Input() roomCountId: string | undefined;
  @Input() roomTypes: string[] = [];
  @Input() index: number = 0;

  roomInfo: BookingFormRoom | undefined;

  bookingFormService = inject(BookingFormService);
  selectOpen = false;

  toggleSelect() {
    this.selectOpen = !this.selectOpen;
  }

  handleRoomTypeChange(type: string) {
    this.handleUpdateRoom({ type: type as RoomTypes });
  }

  increment(field: 'adults' | 'children' | 'infants') {
    if (this.roomInfo && this.roomInfo[field] < 100) {
      this.handleUpdateRoom({ [field]: this.roomInfo[field] + 1 });
    }
  }

  decrement(field: 'adults' | 'children' | 'infants') {
    if (field === 'adults' && this.roomInfo?.adults === 1) {
      return;
    }
    if (this.roomInfo && this.roomInfo[field] > 0) {
      this.handleUpdateRoom({ [field]: this.roomInfo[field] - 1 });
    }
  }

  handleUpdateRoom(change: Partial<BookingFormRoom>) {
    this.bookingFormService.updateRoom(
      this.room as Partial<Room>,
      { ...(this.roomInfo as BookingFormRoom), ...change },
      this.roomCountId as string
    );
  }

  handleRemoveRoom() {
    this.bookingFormService.removeRoom(
      this.room as Partial<Room>,
      this.roomCountId as string
    );
  }

  ngOnInit() {
    this.bookingFormService.formData$.subscribe((formData) => {
      this.roomInfo = formData.selectedRooms[this.roomCountId as string];
    });
  }
}
