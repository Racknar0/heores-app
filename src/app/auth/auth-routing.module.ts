import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

// www.midominio.com/auth/
export const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'login', // www.midominio.com/auth/login
        component: LoginPageComponent,
      },
      {
        path: 'new-account', // www.midominio.com/auth/register
        component: RegisterPageComponent,
      },
      {
        path: '**', // www.midominio.com/auth/cualquiercosa
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
