import {NgModule} from '@angular/core';
import {UserService} from './services/user.service';
import {PortfolioService} from './services/portfolio.service';
import {GamesService} from './services/games.service';
import {TranslationService} from './services/translation.service';

@NgModule({
  declarations: [],
  providers: [UserService, PortfolioService, GamesService, TranslationService],
  exports: [],
  imports: []
})
export class CoreModule {
};
