import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

// www.midominio.com/
const routes: Routes = [
  {
    path: 'auth', // www.midominio.com/auth
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'heroes', // www.midominio.com/heroes
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
  },
  {
    path: '404', // www.midominio.com/404
    component: Error404PageComponent,
  },
  {
    path: '', // www.midominio.com
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
  {
    path: '**', // www.midominio.com/cualquiercosa
    redirectTo: '404',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
