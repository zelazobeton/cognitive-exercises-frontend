import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {UserState} from '../state/user.reducer';
import {getUserPortfolioAction} from '../state/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  currentCard: string;

  constructor(private store: Store<UserState>) {
    this.currentCard = null;
  }

  ngOnInit() {
    this.store.dispatch(getUserPortfolioAction());
  }

  onClick(event) {
    const target = event.target || event.currentTarget;
    this.currentCard = target.attributes.id.nodeValue;
  }
}