import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { tap, switchMap, map, withLatestFrom, catchError } from 'rxjs/operators'
import { of, throwError } from 'rxjs'
import { Router } from '@angular/router'

import * as AuthActions from '../actions/auth.action'

import * as fromModule from '../../auth.reducer'
import { AuthState } from '../../auth.reducer'
import { reducerName } from '../../auth.reducer'
import { Action as ActionDispatched } from '../../../api/models/api-models'
import { AppRoutes as AuthRoutes } from '../../../app.routing'
import { GlobalEnvironmentService } from '../../../global.environment.service'
import { IAuthorizationService } from '../../../api/interfaces/i.authorization.service'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'

@Injectable()
export class AuthEffects {
  private tokenIndexInLocalStorage: string

  constructor(
    private actions$: Actions,
    private router: Router,
    private auth: IAuthorizationService,
    private store$: Store<fromModule.AuthState>,
    private settings: GlobalEnvironmentService
  ) {
    this.tokenIndexInLocalStorage = this.settings.getTokenPath()
  }

  // ----------------- LOGIN -----------------
  @Effect()
  public loginUser$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_ATTEMPT),
    switchMap((action: any) =>
      this.auth.login(action.payload).pipe(
        map(user => {
          return user == null ? new AuthActions.LoginFailure({}) : new AuthActions.LoginSuccess(user)
        }),
        catchError(error => of(new AuthActions.LoginFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_FAILURE),
    tap(payload => {
      this.store$.dispatch(new AuthActions.ErrorLayoutShow(payload))
      this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_SUCCESS),
    withLatestFrom(this.store$.select(x => x[reducerName])),
    map(([action, storelogin]: [ActionDispatched, AuthState]) => {
      localStorage.setItem(this.tokenIndexInLocalStorage, action.payload.token)

      if (storelogin.isRegister) {
        return new AuthActions.ManageBusinessAttempt(storelogin.claimData)
      }

      return new AuthActions.LoginSuccessNoRegister({})
    }),
    catchError(() => of(new AuthActions.LoginFailure({})))
  )

  @Effect({ dispatch: false })
  loginSuccessNoRegister$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_NO_REGISTER),
    tap(() => {
      this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- REGISTER -----------------
  @Effect()
  public registerUser$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REGISTER_ATTEMPT),
    switchMap((action: any) =>
      this.auth.register(action.payload.user).pipe(
        map(user => {
          return user == null ? new AuthActions.RegisterFailure({}) : new AuthActions.RegisterSuccess(user)
        }),
        catchError(error => of(new AuthActions.RegisterFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  registerFailure$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REGISTER_FAILURE),
    tap(payload => {
      this.store$.dispatch(new AuthActions.ErrorLayoutShow(payload))
      this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect()
  registerSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REGISTER_SUCCESS),
    withLatestFrom(this.store$.select(x => x[reducerName])),
    map(([action, storeRegister]: [ActionDispatched, AuthState]) => {
      return new AuthActions.LoginAttempt(storeRegister.loggedUser)
    })
  )

  // ----------------- Manage Business -----------------

  @Effect()
  public manageBusiness$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_ATTEMPT),
    switchMap((action: any) =>
      this.auth.manageBusiness(action.payload).pipe(
        map(response => {
          return response == null ? new AuthActions.ManageBusinessFailure({}) : new AuthActions.ManageBusinessSuccess(response)
        }),
        catchError(error => of(new AuthActions.ManageBusinessFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  manageBusinessFailure$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_FAILURE),
    tap(payload => {
      this.store$.dispatch(new AuthActions.ErrorLayoutShow(payload))
      this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect({ dispatch: false })
  manageBusinessSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_SUCCESS),
    tap(() => {
      // this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- LOGOUT -----------------
  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT),
    map(() => {
      localStorage.removeItem(reducerName)
      localStorage.removeItem(this.tokenIndexInLocalStorage)
      return new AuthActions.LogoutFailure({})
    })
  )

  @Effect({ dispatch: false })
  public logoutStatus$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT_SUCCESS),
    map(() => {
      localStorage.removeItem(reducerName)
      localStorage.removeItem(this.tokenIndexInLocalStorage)
      this.router.navigate([AuthRoutes.LOGIN])
    })
  )
}
