import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action, Store } from '@ngrx/store'

import * as googleActions from './google.actions'
import * as fromDirectories from '../../directories.selector'

import { IDashBoardService } from '@app/api/interfaces/i.dashboard.service'
import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable()
export class GoogleEffects {
  constructor(private actions$: Actions, private router: Router, private storeDashBoard$: Store<fromDirectories.DirectoriesState>, private dashBoardService: IDashBoardService) {}

  // ----------------- Get Business -----------------

  @Effect()
  getBusiness$: Observable<Action> = this.actions$.pipe(
    ofType(googleActions.ActionTypes.GET_BUSINESS_UNITS),
    switchMap((payload: any) =>
      this.dashBoardService.businessData().pipe(
        map((response: any) => {
          return new googleActions.GetAllBusinessSuccessAction(response)
        }),
        catchError(error => of(new googleActions.GetAllBusinessFailureAction(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  getBusinessSuccess$ = this.actions$.pipe(
    ofType(googleActions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS),
    tap((action: googleActions.GetAllBusinessSuccessAction) => {
      const selectBusiness = action.payload[action.payload.length - 1]
      if (selectBusiness.channels[0].awaitingOwnership === 'YES') {
        this.storeDashBoard$.dispatch(new googleActions.OauthAttempt({ request: { businessUnitId: selectBusiness.id, channel: 'GOOGLE_MY_BUSINESS' } }))
      }
    })
  )

  // ----------------- Request Admin Rights -----------------

  @Effect()
  requestAdminRightsAttempt$ = this.actions$.pipe(
    ofType(googleActions.ActionTypes.REQUEST_ADMIN_RIGHTS_ATTEMPT),
    switchMap((action: googleActions.RequestAdminRightsAttempt) =>
      this.dashBoardService.requestAdminRightsById(action.payload).pipe(
        map((response: any) => {
          return response === null ? new googleActions.RequestAdminRightsFailure({}) : new googleActions.RequestAdminRightsSuccess(response)
        }),
        catchError(error => of(new googleActions.RequestAdminRightsFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  requestAdminRightsFailure$ = this.actions$.pipe(
    ofType(googleActions.ActionTypes.REQUEST_ADMIN_RIGHTS_FAILURE),
    tap(payload => {})
  )

  @Effect({ dispatch: false })
  requestAdminRightsSuccess$ = this.actions$.pipe(
    ofType(googleActions.ActionTypes.REQUEST_ADMIN_RIGHTS_SUCCESS),
    tap((action: googleActions.RequestAdminRightsSuccess) => {
      // this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- Oauth tokens-----------------
  @Effect()
  OauthTokenRequest$ = this.actions$.pipe(
    ofType(googleActions.ActionTypes.OAUTH_TOKEN_ATTEMPT),
    switchMap((action: googleActions.OauthAttempt) =>
      this.dashBoardService.oAuthTokens(action.payload.request).pipe(
        map((response: any) => {
          return response === null ? new googleActions.OauthFailure() : new googleActions.OauthSuccess()
        }),
        catchError(error => of(new googleActions.OauthFailure({ businessUnitId: action.payload.request.businessUnitId })))
      )
    )
  )

  @Effect({ dispatch: false })
  OauthTokenRequestFailure$ = this.actions$.pipe(
    ofType(googleActions.ActionTypes.OAUTH_TOKEN_FAILURE),
    map((action: googleActions.RequestAdminRightsAttempt) => {
      this.storeDashBoard$.dispatch(new googleActions.RequestAdminRightsAttempt({ businessUnitId: action.payload.businessUnitId, channel: 'GOOGLE_MY_BUSINESS' }))
    })
  )
}
