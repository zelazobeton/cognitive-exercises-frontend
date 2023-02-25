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
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {userReducer} from './state/user.reducer';
import {UserEffects} from './state/user.effects';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginDropdownComponent} from './login-dropdown/login-dropdown.component';

@NgModule({
  declarations: [ChangePasswordComponent, LoginComponent, PersonalDataComponent, ProfilePageComponent,
                 RegisterComponent, ResetPasswordComponent, NavbarComponent, LoginDropdownComponent],
  providers: [],
  exports: [RegisterComponent, LoginComponent, NavbarComponent, LoginDropdownComponent],
  imports: [AppRoutingModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            TranslateModule,
            NotificationModule,
            StoreModule.forFeature('user', userReducer),
            EffectsModule.forFeature([UserEffects])]
})
export class UserModule {
};
