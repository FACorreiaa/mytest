import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { tap, switchMap, map, concatMap, withLatestFrom, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { Router } from '@angular/router'

import * as AuthActions from '../actions/auth.action'
import * as fromModule from '../../auth.reducer'
import { AuthState } from '../../auth.reducer'
import { reducerName } from '../../auth.reducer'
import { UserLoginDto, Action as ActionDispatched } from '../../../api/models/api-models'
import { LoginAttempt } from '../actions/auth.action'
import { AppRoutes as AuthRoutes } from '../../../app.routing'
import { GlobalEnvironmentService } from '../../../global.environment.service'
import { IAuthorizationService } from '../../../api/interfaces/i.authorization.service'

import 'rxjs/add/operator/map'
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
    switchMap((payload: any) =>
      this.auth
        .login(payload.payload)
        .map(user => {
          return user == null ? new AuthActions.LoginFailure({}) : new AuthActions.LoginSuccess(user)
        })
        .catch(() => of(new AuthActions.LoginFailure({})))
    )
  )

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_FAILURE),
    tap(() => {
      // Temporary - should redirect to error page
      console.log('login failure - effect')
    })
  )

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_SUCCESS),
    withLatestFrom(this.store$.select(x => x[reducerName])),
    map(([action, store]: [ActionDispatched, AuthState]) => {
      return Object.assign({}, store, { authorized: true, loggedUser: action.payload })
    }),
    tap((payload: fromModule.AuthState) => {
      localStorage.setItem(reducerName, JSON.stringify(payload))
      localStorage.setItem(this.tokenIndexInLocalStorage, JSON.stringify(payload.loggedUser))

      console.log('login success - effect', payload)
      this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- REGISTER -----------------
  @Effect()
  public registerUser$ = this.actions$.ofType(AuthActions.AuthActionTypes.REGISTER_ATTEMPT).switchMap((payload: any) =>
    this.auth
      .register(payload)
      .map(user => {
        return user == null ? new AuthActions.RegisterFailure({}) : new AuthActions.RegisterSuccess(user)
      })
      .catch(() => of(new AuthActions.RegisterFailure({})))
  )

  @Effect({ dispatch: false })
  registerFailure$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REGISTER_FAILURE),
    tap(() => {
      // Temporary - should redirect to error page
    })
  )

  @Effect({ dispatch: false })
  registerSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REGISTER_SUCCESS),
    withLatestFrom(this.store$.select(x => x[reducerName])),
    map(([action, store]: [ActionDispatched, AuthState]) => {
      return Object.assign({}, store, { authorized: true, loggedUser: action.payload })
    }),
    tap((payload: fromModule.AuthState) => {
      localStorage.setItem(reducerName, JSON.stringify(payload))
      localStorage.setItem(this.tokenIndexInLocalStorage, JSON.stringify(payload))
      this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- LOGOUT -----------------
  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT),
    map(() => {
      return new AuthActions.LogoutSuccess({})
    })
  )
}
