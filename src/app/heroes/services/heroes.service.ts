import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HerosService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError((err) => {
        console.log('HTTP Error', err);
        return of(undefined);
      })
    );
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${this.baseUrl}/heroes`)
      .pipe(
        map((heroes) =>
          heroes.filter((hero) =>
            hero.superhero.toLowerCase().includes(query.toLowerCase())
          )
        )
      );
  }
}
