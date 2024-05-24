import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

// www.midominio.com/heroes/
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'new-hero',  // www.midominio.com/heroes/new-hero
        component: NewPageComponent
      },
      {
        path: 'search',  // www.midominio.com/heroes/search
        component: SearchPageComponent
      },
      {
        path: 'edit/:id',  // www.midominio.com/heroes/search
        component: NewPageComponent
      },
      {
        path: 'list',  //! www.midominio.com/heroes/list
        component: ListPageComponent
      },
      { // este path debe ser el último para que no interfiera con los otros
        path: ':id',  // www.midominio.com/heroes/1
        component: HeroPageComponent
      },
      {
        path: '**',  // www.midominio.com/heroes/cualquiercosa
        redirectTo: 'list'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
