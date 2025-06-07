import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import boardTypes from '../../data/boardTypes.json';
import { BoardTypes, Room, RoomTypes } from '../../types/common';
import { dateDifferenceInDays } from '../../lib/utils';

export interface BookingFormUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
}

export interface BookingFormPayment {
  method: 'card' | 'mpesa' | 'cash' | 'paypal' | null;
  card?: {
    name: string;
    number: string;
    expiry: string;
    cvv: string;
  };
  mpesa?: {
    number?: string;
    code?: string;
  };
  paypal?: {
    email: string;
  };
}

export interface BookingFormRoom {
  price: number;
  type: RoomTypes;
  adults: number;
  children: number;
  infants: number;
}

export interface ReceiptItem {
  title: string;
  amount: number;
  currency?: string;
  quantity: number;
  items: ReceiptItem[];
}

export interface BookingFormPrice {
  total: number;
  tax: number;
  currency: string;
}

export interface BookingFormData {
  checkIn: Date;
  checkOut: Date;
  boardType: BoardTypes;
  room: {
    id: string;
    name: string;
    count: number;
  };
  user: BookingFormUser | null;
  payment: BookingFormPayment | null;
  price: BookingFormPrice;
  selectedRooms: Record<string, BookingFormRoom>;
}

@Injectable({
  providedIn: 'root',
})
export class BookingFormService {
  private readonly _defaultForm: BookingFormData = {
    checkIn: new Date(),
    checkOut: new Date(),
    boardType: 'bed and breakfast',
    room: {
      id: '',
      name: '',
      count: 0,
    },
    user: null,
    payment: null,
    price: {
      total: 0,
      tax: 0,
      currency: 'Kes',
    },
    selectedRooms: {},
  };

  private countId = 0;

  private formDataSubject = new BehaviorSubject<BookingFormData>(
    this._defaultForm
  );

  /** Observable to subscribe to form updates */
  formData$ = this.formDataSubject.asObservable();

  getForm(): BookingFormData {
    return this.formDataSubject.getValue();
  }

  getBookingFormUser(): BookingFormUser | null {
    return this.getForm().user;
  }

  setBookingFormUser(user: BookingFormUser): void {
    const current = this.getForm();
    this.formDataSubject.next({
      ...current,
      user,
    });
  }

  setBookingFormPayment(payment: BookingFormPayment): void {
    const current = this.getForm();
    this.formDataSubject.next({
      ...current,
      payment,
    });
  }

  updateTopLevelBookingData(update: Partial<BookingFormData>): void {
    const current = this.getForm();

    let newPrice: BookingFormPrice = current.price;
    if (update.boardType) {
      newPrice.total -= boardTypes[current.boardType].price;
      newPrice.total += boardTypes[update.boardType as BoardTypes].price;
    }

    this.formDataSubject.next({
      ...current,
      price: newPrice,
      ...update,
    });
  }

  updateRoom(
    room: Partial<Room>,
    data: BookingFormRoom,
    roomCountId?: string | null
  ): void {
    if (room.id && room.price && room.types) {
      const current = this.getForm();
      let newPrice: BookingFormPrice = current.price;
      const days = dateDifferenceInDays(current.checkIn, current.checkOut);

      if (!roomCountId) {
        //new room
        this.countId += 1;
        roomCountId = String(this.countId);

        //update room price
        data.price =
          room.price.amount * days +
          room.types[data.type] +
          boardTypes[current.boardType].price;

        //update booking price
        newPrice.total += data.price - boardTypes[current.boardType].price;
        newPrice.tax += room.price.tax * days;

        //update room count
        current.room.count += 1;
      } else {
        //existing room
        if (data.type !== current.selectedRooms[roomCountId].type) {
          //update room price
          data.price =
            current.selectedRooms[roomCountId].price -
            room.types[current.selectedRooms[roomCountId].type] +
            room.types[data.type];

          //update booking price
          newPrice.total =
            newPrice.total -
            room.types[current.selectedRooms[roomCountId].type] +
            room.types[data.type];
        }
      }

      this.formDataSubject.next({
        ...current,
        price: newPrice,
        selectedRooms: {
          ...current.selectedRooms,
          [roomCountId]: data,
        },
      });
    }
  }

  removeRoom(room: Partial<Room>, roomCountId: string): void {
    if (room.id && room.price) {
      const current = this.getForm();
      const days = dateDifferenceInDays(current.checkIn, current.checkOut);
      let newPrice: BookingFormPrice = current.price;

      newPrice.total -= current.selectedRooms[roomCountId].price;
      newPrice.tax -= room.price.tax * days;

      const { [roomCountId]: _, ...rest } = current.selectedRooms;
      let newSelectedRooms = rest;

      current.room.count -= 1;

      this.formDataSubject.next({
        ...current,
        price: newPrice,
        selectedRooms: newSelectedRooms,
      });
    }
  }

  submit() {
    const current = this.getForm();
    console.log(current);
  }

  reset() {
    this.formDataSubject.next({
      checkIn: new Date(),
      checkOut: new Date(),
      boardType: 'bed and breakfast',
      room: {
        id: '',
        name: '',
        count: 0,
      },
      user: null,
      payment: null,
      price: {
        total: 0,
        tax: 0,
        currency: 'Kes',
      },
      selectedRooms: {},
    });
    this.countId = 0;
  }
}
