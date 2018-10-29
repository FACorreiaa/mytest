import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { tap, switchMap, map, withLatestFrom, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { Router } from '@angular/router'

import * as AuthActions from '../actions/auth.action'
import * as fromModule from '../../auth.reducer'
import { AuthState } from '../../auth.reducer'
import { reducerName } from '../../auth.reducer'
import { Action as ActionDispatched, UserLoginDto, Data } from '../../../api/models/api-models'
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

  // Temporary properties, just for development reasons
  private userAux: UserLoginDto = { email: 'test3@cocus.com', password: '12345678' }

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
        .login(this.userAux)
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

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGIN_SUCCESS),
    withLatestFrom(this.store$.select(x => x[reducerName])),
    map(([action, storelogin]: [ActionDispatched, AuthState]) => {
      localStorage.setItem(this.tokenIndexInLocalStorage, action.payload.token)

      return new AuthActions.ManageBusinessAttempt(storelogin.claimData)
    }),
    catchError(() => of(new AuthActions.LoginFailure({})))
  )

  // ----------------- REGISTER -----------------
  @Effect()
  public registerUser$ = this.actions$.ofType(AuthActions.AuthActionTypes.REGISTER_ATTEMPT).switchMap((action: any) =>
    this.auth
      .register(action.payload.user)
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
      console.log('registration failure - effect')
      this.router.navigate([AuthRoutes.WIZARD])
    })
  )

  @Effect()
  registerSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REGISTER_SUCCESS),
    withLatestFrom(this.store$.select(x => x[reducerName])),
    map(([action, storeRegister]: [ActionDispatched, AuthState]) => {
      return new AuthActions.LoginAttempt(storeRegister.loggedUser)
    })
    // ,
    // tap((payload: fromModule.AuthState) => {
    //   this.router.navigate([AuthRoutes.LOGIN])
    // })
  )

  // ----------------- Manage Business -----------------

  @Effect()
  public manageBusiness$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_ATTEMPT),
    switchMap((payload: any) =>
      this.auth
        .manageBusiness(payload.payload)
        .map(res => {
          return res == null ? new AuthActions.ManageBusinessFailure({}) : new AuthActions.ManageBusinessSuccess(res)
        })
        .catch(() => of(new AuthActions.ManageBusinessFailure({})))
    )
  )

  @Effect({ dispatch: false })
  manageBusinessFailure$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_FAILURE),
    tap(() => {
      // Temporary - should redirect to error page
      console.log('manage business failure - effect')

      this.router.navigate([AuthRoutes.MAIN])
    })
  )

  @Effect({ dispatch: false })
  manageBusinessSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_SUCCESS),
    tap(() => {
      this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- LOGOUT -----------------
  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LOGOUT),
    map(() => {
      localStorage.removeItem(reducerName)
      localStorage.removeItem(this.tokenIndexInLocalStorage)
      return new AuthActions.LogoutSuccess({})
    })
  )
}
