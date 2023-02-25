import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserScoreDto} from '../../shared/model/scoreboard-page-dto';
import {Store} from '@ngrx/store';
import {HomeState} from '../state/home.reducer';
import {scoreBoardPageSelector} from '../state/home.selectors';
import {getScoreBoardPageAction} from '../state/home.actions';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  private static readonly PAGE_SIZE = 10;
  private userScores: UserScoreDto[];
  private pageNumber: number;
  private pagesTotal: number;
  public ngDestroyed$ = new Subject();

  constructor(private store: Store<HomeState>) {
  }

  getNextPage() {
    if (!this.isLastPage()) {
      this.store.dispatch(
        getScoreBoardPageAction(
          {pageNum: this.pageNumber + 1, pageSize: ScoreboardComponent.PAGE_SIZE}));
    }
  }

  getPreviousPage() {
    if (!this.isFirstPage()) {
      this.store.dispatch(
        getScoreBoardPageAction(
          {pageNum: this.pageNumber - 1, pageSize: ScoreboardComponent.PAGE_SIZE}));
    }
  }

  ngOnInit() {
    this.store.dispatch(getScoreBoardPageAction({pageNum: 0, pageSize: 10}));
    this.store.select(scoreBoardPageSelector)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((scoreboardPage) => {
        this.userScores = scoreboardPage?.userScores;
        this.pageNumber = scoreboardPage?.pageNumber;
        this.pagesTotal = scoreboardPage?.pagesTotal;
      })
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }

  public isLastPage() {
    return this.pageNumber === this.pagesTotal - 1;
  }

  public isFirstPage() {
    return this.pageNumber === 0;
  }
}
