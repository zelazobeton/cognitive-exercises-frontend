import {NgModule} from '@angular/core';
import {NotificationModule} from '../notification/notification.module';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {LoginComponent} from './login/login.component';
import {PersonalDataComponent} from './personal-data/personal-data.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {RegisterComponent} from './register/register.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ChangePasswordComponent, LoginComponent, PersonalDataComponent, ProfilePageComponent,
                 RegisterComponent, ResetPasswordComponent],
  providers: [],
  exports: [RegisterComponent, LoginComponent],
  imports: [AppRoutingModule,
            CommonModule,
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            TranslateModule,
            NotificationModule]
})
export class UserModule {
};
