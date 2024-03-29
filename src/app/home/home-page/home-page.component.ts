import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GameDataDto} from '../../shared/model/game-data-dto';
import {Store} from '@ngrx/store';
import {getGamesDataAction} from '../state/home.actions';
import {gamesDataErrorSelector, gamesDataSelector, State} from '../state/home.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public gamesData: GameDataDto[];
  public gamesData$: Observable<GameDataDto[]>;
  public gamesDataError$: Observable<string>;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.dispatch(getGamesDataAction());
    this.gamesData$ = this.store.select(gamesDataSelector);
    this.gamesDataError$ = this.store.select(gamesDataErrorSelector);
  }
}
