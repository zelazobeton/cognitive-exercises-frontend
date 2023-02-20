import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserDto} from '../../shared/model/user-dto';
import {Store} from '@ngrx/store';
import {loggedUserSelector, State} from '../state/core.selectors';
import {logoutUserAction} from '../state/core.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedUser$: Observable<UserDto>;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.loggedUser$ = this.store.select(loggedUserSelector);
  }

  public onLogout() {
    this.store.dispatch(logoutUserAction());
  }
}
