import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/user.reducer';

const getUserFeaureState = createFeatureSelector<State>('user');

export const getUser = createSelector(
  getUserFeaureState,
  (state) => state.user
);

export const getError = createSelector(
  getUserFeaureState,
  (state) => state.error
);
