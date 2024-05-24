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

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) {
      throw new Error('Hero ID is required');
    }
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<boolean> {
    if (!id) {
      throw new Error('Hero ID is required');
    }
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError((err) => of(false)),
      map((res) => true)
    );
  }
}
