import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NotificationModule} from './notification/notification.module';
import { RegisterComponent } from './pages/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthModule} from './auth/auth.module';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CompressModule} from '../compress/compress.module';
import {HomeModule} from './home/home.module';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ChangePasswordComponent} from './pages/profile/change-password/change-password.component';
import {PersonalDataComponent} from './pages/profile/personal-data/personal-data.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {GamesModule} from './games/games.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    PersonalDataComponent,
    ResetPasswordComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    CompressModule,
    CoreModule,
    BrowserModule,
    FormsModule,
    GamesModule,
    HomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotificationModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Cognitive Exercises',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
