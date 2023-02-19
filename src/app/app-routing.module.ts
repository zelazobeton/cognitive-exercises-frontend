import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {AuthenticationGuard} from './auth/guard/authentication.guard';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {HomePageComponent} from './home/home-page/home-page.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'g',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
