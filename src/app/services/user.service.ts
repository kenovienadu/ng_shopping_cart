import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  login(user: User) {
    this.currentUserSubject.next(user);
  }

  logout() {
    // Logic to handle user logout
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUser(user: User) {
    this.currentUserSubject.next(user);
  }
}
