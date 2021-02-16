import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
// Observable
import { Observable, of } from 'rxjs';
// Store
import { Action } from '@ngrx/store';
// Actions
import * as userActions from '../actions/user.actions';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Operators
import { mergeMap, map, catchError } from 'rxjs/Operators';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private _users: AdminService) {}

  // @Effect()
  // loadUser$: Observable<Action> = this.actions$.pipe(
  //   ofType(userActions.UserActionTypes.LoadUsers),
  //   mergeMap((action) =>
  //     this._users.getUsersList().pipe(
  //       map((user) => new userActions.LoadUsersSuccess({ data: user })),
  //       catchError((err) =>
  //         of(new userActions.LoadUsersFailure({ error: err }))
  //       )
  //     )
  //   )
  // );
}
