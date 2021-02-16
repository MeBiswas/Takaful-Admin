import { Action } from '@ngrx/store';
import { IUser } from 'src/app/model/user';

export enum UserActionTypes {
  LoadUser = '[User] Load User',
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;
  constructor(public payload: { data: IUser }) {}
}

export type UserActions = LoadUser;
