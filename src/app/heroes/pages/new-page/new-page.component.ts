import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HerosService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent implements OnInit {
  // Este es el formulario Reactivo que se usará en la vista
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  constructor(
    private herosService: HerosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.herosService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) {
          this.router.navigateByUrl('/');
          return;
        }

        this.heroForm.reset(hero); // Se resetea el formulario con los valores del héroe
      });
  }

  // Este getter es para obtener el valor actual del formulario y convertirlo en un Hero
  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  // Este método se ejecuta cuando se envía el formulario
  onSubmit(): void {
    console.log({
      formIsValid: this.heroForm.valid,
      formValue: this.heroForm.value,
    });

    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    // Si el héroe tiene un ID, entonces se actualiza
    if (this.currentHero.id) {
      this.herosService.updateHero(this.currentHero).subscribe((hero) => {
        //todo mostrar snackbar
        this.showSnackBar('Registro actualizado');
        console.log('Actualizado', hero);
      });
      return;
    }

    this.herosService.addHero(this.currentHero).subscribe((hero) => {
      //todo mostrar snackbar y navegar a /heroes/edit/ hero.id
      this.showSnackBar('Registro creado');
      console.log('Guardado', hero);
      this.router.navigate(['/heroes/edit', hero.id]);
    });
  }

  onDeleteHero() {
    if ( !this.currentHero.id ) throw new Error('No se puede eliminar un héroe sin ID');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log({result});
    });
  }


  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok!', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
