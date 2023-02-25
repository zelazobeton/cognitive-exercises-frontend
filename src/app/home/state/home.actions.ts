import {createAction, props} from '@ngrx/store';

export const getGamesDataAction = createAction(
  '[Home] get available games'
);

export const getScoreBoardPageAction = createAction(
  '[Home] get scoreboard page',
  props<{pageNum: number, pageSize: number}>()
);
