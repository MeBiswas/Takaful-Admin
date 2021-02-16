import { Action } from '@ngrx/store';
// User Actions
import { UserActions, UserActionTypes } from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {
  user: any;
  error: string;
}

export const initialState: State = {
  user: null,
  error: '',
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadUser:
      return {
        ...state,
        user: action.payload,
        error: '',
      };

    default:
      return state;
  }
}
