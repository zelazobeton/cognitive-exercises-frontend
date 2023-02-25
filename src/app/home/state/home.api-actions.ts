import {createAction, props} from '@ngrx/store';
import {GameDataDto} from '../../shared/model/game-data-dto';
import {ScoreboardPageDto} from '../../shared/model/scoreboard-page-dto';

export const getGamesDataSuccessAction = createAction(
  '[Home API] get available games success',
  props<{ gamesData: GameDataDto[] }>()
);

export const getGamesDataFailureAction = createAction(
  '[Home API] get available games failed',
  props<{ error: string }>()
);

export const getScoreboardPageSuccessAction = createAction(
  '[Home API] get scoreboard page success',
  props<{ scoreboardPage: ScoreboardPageDto }>()
);

export const getScoreboardPageFailureAction = createAction(
  '[Home API] get scoreboard page failed'
);