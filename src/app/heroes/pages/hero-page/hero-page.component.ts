import { Component, OnInit } from '@angular/core';
import { HerosService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, delay } from 'rxjs/operators';
import { Hero,  } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``,
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;

  constructor(
    private heroservice: HerosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(500),
        switchMap(({ id }) => this.heroservice.getHeroById(id))
        )
      .subscribe((hero) => {
        if (!hero) {
          this.router.navigate(['/heroes/list']);
          return;
        } else {
          this.hero = hero;
          console.log(hero);
        }
      });
  }

  goBack() : void {
    this.router.navigate(['/heroes/list']);
  }
}
