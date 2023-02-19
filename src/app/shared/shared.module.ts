import {NgModule} from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginDropdownComponent} from './login-dropdown/login-dropdown.component';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, LoginDropdownComponent],
  providers: [],
  exports: [NavbarComponent, LoginDropdownComponent],
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
};
