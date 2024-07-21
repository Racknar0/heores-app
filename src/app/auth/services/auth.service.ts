import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap, of, map, catchError } from 'rxjs';

@Injectable({providedIn: 'root'})

export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private user? : User;

  constructor(private http: HttpClient) { }

  get currentUser() : User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login (email: string, password: string): Observable<User> {
    // return this.http.post<User>(`${this.baseUrl}/auth`, {email, password})
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', "123456"))
      )
  }

  checkAuth(): Observable<boolean> | boolean {

    if (!localStorage.getItem('token')) {
      return false;
    }

    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(error => of(false))
      )

  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }

}
