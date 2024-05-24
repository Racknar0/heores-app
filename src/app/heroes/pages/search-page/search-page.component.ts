import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HerosService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroserivice: HerosService) {}

  searchHero() {
    const value: string = this.searchInput.value || '';
    this.heroserivice
      .getSuggestions(value.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  onSelectedOption(e : MatAutocompleteSelectedEvent){
    if (!e.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = e.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
