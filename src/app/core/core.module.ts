import {NgModule} from '@angular/core';
import {UserService} from './services/user.service';
import {PortfolioService} from './services/portfolio.service';
import {GamesService} from './services/games.service';
import {TranslationService} from './services/translation.service';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  providers: [UserService, PortfolioService, GamesService, TranslationService],
  exports: [],
  imports: [TranslateModule,
            CommonModule,
            RouterModule,
            ReactiveFormsModule]
})
export class CoreModule {
};
