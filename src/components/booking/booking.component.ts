import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Room, RoomTypes } from '../../types/common';
import { QueryFormService } from '../../services/query-form/query-form.service';
import {
  BookingFormData,
  BookingFormRoom,
  BookingFormService,
} from '../../services/booking-form/booking-form.service';
import { StepsService } from '../../services/steps/steps.service';
import { BookingRoomComponent } from '../booking-room/booking-room.component';
import { fadeInOut, leftIn } from '../../animations';
import { RoomService } from '../../services/room/room.service';

@Component({
  selector: 'app-booking',
  imports: [MatIcon, DatePipe, BookingRoomComponent, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  animations: [fadeInOut, leftIn],
})
export class BookingComponent {
  roomService = inject(RoomService);

  room: Room | null = this.roomService.getRoom();
  roomTypes: string[] | undefined;

  queryForm = inject(QueryFormService).getForm();
  bookingFormService = inject(BookingFormService);
  stepsService = inject(StepsService);

  bookingForm: BookingFormData | undefined;
  bookingFormRooms:
    | (BookingFormRoom & { index: number; roomCountId: string })[]
    | undefined;

  handleBack() {
    this.stepsService.back();
  }

  handleHome() {
    this.stepsService.reset();
  }

  handleAddRoom() {
    this.bookingFormService.updateRoom(this.room as Partial<Room>, {
      type: this.roomTypes?.[0] as RoomTypes,
      adults: 1,
      children: 0,
      infants: 0,
      price: 0,
    });
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
      });
      clearTimeout(timeout);
    }, 100);
  }

  handleProceed() {
    this.stepsService.next('checkout');
  }

  initializeBookingForm() {
    this.bookingFormService.reset();

    this.bookingFormService.updateTopLevelBookingData({
      checkIn: this.queryForm.value.checkIn,
      checkOut: this.queryForm.value.checkOut,
      boardType: this.queryForm.value.boardType,
      room: {
        id: this.room?.id as string,
        name: this.room?.name as string,
        count: 0,
      },
    });

    this.bookingFormService.updateRoom(this.room as Partial<Room>, {
      type: this.roomTypes?.[0] as RoomTypes,
      adults: this.queryForm.value.adults,
      children: this.queryForm.value.children,
      infants: this.queryForm.value.infants,
      price: 0,
    });
  }

  constructor() {
    this.roomService.room$.subscribe((room) => {
      if (room) {
        this.room = room;
        this.roomTypes = Object.keys(this.room?.types ?? {});
        const currentForm = this.bookingFormService.getForm();
        if (currentForm.room.id !== room.id) {
          this.initializeBookingForm();
        }
      }
    });

    this.bookingFormService.formData$.subscribe((formData) => {
      this.bookingForm = formData;
      this.bookingFormRooms = Object.keys(formData.selectedRooms || {}).map(
        (roomCountId, index) => ({
          index,
          roomCountId,
          ...formData.selectedRooms[roomCountId],
        })
      );
    });
  }
}
