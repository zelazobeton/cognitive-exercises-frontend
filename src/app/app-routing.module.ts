import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './user/register/register.component';
import {AuthenticationGuard} from './auth/guard/authentication.guard';
import {ResetPasswordComponent} from './user/reset-password/reset-password.component';
import {HomePageComponent} from './home/home-page/home-page.component';
import {ProfilePageComponent} from './user/profile-page/profile-page.component';
import {LoginComponent} from './user/login/login.component';


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
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
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
