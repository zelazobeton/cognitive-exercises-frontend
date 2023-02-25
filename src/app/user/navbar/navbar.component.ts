import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoggedUserDto} from '../../shared/model/logged-user-dto';
import {Store} from '@ngrx/store';
import {loggedUserSelector, State} from '../state/user.selectors';
import {logoutUserAction} from '../state/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  loggedUser$: Observable<LoggedUserDto>;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.loggedUser$ = this.store.select(loggedUserSelector);
  }

  public onLogout() {
    this.store.dispatch(logoutUserAction());
  }
}
