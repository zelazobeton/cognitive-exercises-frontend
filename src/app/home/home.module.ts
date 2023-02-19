import {NgModule} from '@angular/core';
import {HomePageComponent} from './home-page/home-page.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {homeReducer} from './state/home.reducer';
import {HomeEffects} from './state/home.effects';
import {NotificationModule} from '../notification/notification.module';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [HomePageComponent, ScoreboardComponent],
  providers: [],
  exports: [],
  imports: [BrowserModule,
            AppRoutingModule,
            CommonModule,
            NotificationModule,
            StoreModule.forFeature('home', homeReducer),
            EffectsModule.forFeature([HomeEffects])]
})
export class HomeModule {
};
