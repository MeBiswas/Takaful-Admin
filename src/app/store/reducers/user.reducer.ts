import { Action } from '@ngrx/store';
// User Interface
import { IUser } from 'src/app/model/user';
// User Actions
import { UserActions, UserActionTypes } from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {
  user: any;
  error: string;
}

export const initialState: State = {
  user: [],
  error: '',
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadUsers:
      return {
        ...state,
      };

    case UserActionTypes.LoadUsersSuccess:
      return {
        ...state,
        user: [...action.payload.data.userList],
        error: '',
      };

    case UserActionTypes.LoadUsersFailure:
      return {
        ...state,
        user: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
}
