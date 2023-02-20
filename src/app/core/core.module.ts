import {NgModule} from '@angular/core';
import {UserService} from './services/user.service';
import {PortfolioService} from './services/portfolio.service';
import {GamesService} from './services/games.service';
import {TranslationService} from './services/translation.service';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginDropdownComponent} from './login-dropdown/login-dropdown.component';
import {EffectsModule} from '@ngrx/effects';
import {coreReducer} from './state/core.reducer';
import {CoreEffects} from './state/core.effects';
import {StoreModule} from '@ngrx/store';

@NgModule({
  declarations: [NavbarComponent, LoginDropdownComponent],
  providers: [UserService, PortfolioService, GamesService, TranslationService],
  exports: [NavbarComponent, LoginDropdownComponent],
  imports: [TranslateModule,
            CommonModule,
            RouterModule,
            ReactiveFormsModule,
            StoreModule.forFeature('core', coreReducer),
            EffectsModule.forFeature([CoreEffects])]
})
export class CoreModule {
};
