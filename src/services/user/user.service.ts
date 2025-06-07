import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaymentMethod, User } from '../../types/common';
import userData from '../../data/user.json';

export interface UserServiceUser {
  isLoading: boolean;
  isLoggedIn: boolean;
  data: User | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<UserServiceUser>({
    isLoading: true,
    isLoggedIn: false,
    data: null,
  });

  user$ = this.user.asObservable();

  getUser(): UserServiceUser {
    return this.user.getValue();
  }

  login(provider: string) {
    this.user.next({
      isLoading: true,
      isLoggedIn: false,
      data: null,
    });

    this.fetchUser();
  }

  logout() {
    this.user.next({
      isLoading: false,
      isLoggedIn: false,
      data: null,
    });
  }

  updateUser(update: Partial<User>) {
    //this would be an api call in real life
    const currentUser = this.getUser().data;
    if (!currentUser) return;

    this.user.next({
      ...this.getUser(),
      data: {
        ...currentUser,
        ...update,
      },
    });
  }

  addPaymentMethod(method: PaymentMethod) {
    const currentUser = this.getUser().data;
    if (!currentUser) return;

    this.user.next({
      ...this.getUser(),
      data: {
        ...currentUser,
        paymentMethods: [...currentUser.paymentMethods, method],
      },
    });
  }

  removePaymentMethod(index: number) {
    const currentUser = this.getUser().data;
    if (!currentUser) return;

    currentUser.paymentMethods.splice(index, 1);

    this.user.next({
      ...this.getUser(),
      data: {
        ...currentUser,
      },
    });
  }

  fetchUser() {
    //simulate api call
    setTimeout(() => {
      this.user.next({
        isLoading: false,
        isLoggedIn: true,
        data: userData as User,
      });
    }, 1000);
  }

  constructor() {
    this.fetchUser();
  }
}
