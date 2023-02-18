import {createAction, props} from '@ngrx/store';
import {GameDataDto} from '../../shared/model/game-data-dto';

export const getGamesDataSuccessAction = createAction(
  '[Games API] get available games success',
  props<{ gamesData: GameDataDto[] }>()
);

export const getGamesDataFailureAction = createAction(
  '[Games API] get available games failed',
  props<{ error: string }>()
);