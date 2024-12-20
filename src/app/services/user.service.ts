import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'user';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  constructor() {
    const user = sessionStorage.getItem(this.storageKey);
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(user: User) {
    this.currentUserSubject.next(user);
    sessionStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logout() {
    // Logic to handle user logout
    this.currentUserSubject.next(null);
    sessionStorage.removeItem(this.storageKey);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUser(user: User) {
    this.currentUserSubject.next(user);
  }
}
