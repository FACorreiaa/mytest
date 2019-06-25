import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action, Store } from '@ngrx/store'

import * as dashBoardActions from '../actions/dashboard.actions'
import * as fromModuleFeature from '../../dashboard.selector'
import { AppRoutes as AuthRoutes } from '../../../../app.routing'

import { IDashBoardService } from '@app/api/interfaces/i.dashboard.service'
import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable()
export class DashBoardEffects {
  // ----------------- Get Business -----------------

  @Effect()
  getBusiness$: Observable<Action> = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.GET_BUSINESS_UNITS),
    switchMap((payload: any) =>
      this.dashBoardService.businessData().pipe(
        map((response: any) => {
          return new dashBoardActions.GetAllBusinessSuccessAction(response)
        }),
        catchError(error => of(new dashBoardActions.GetAllBusinessFailureAction(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  getBusinessSuccess$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS),
    tap((action: dashBoardActions.GetAllBusinessSuccessAction) => {
      if (action.payload.length === 0) {
        this.router.navigate([AuthRoutes.WIZARD])
      } else {
        const selectBusiness = action.payload[action.payload.length - 1]

        if (selectBusiness.channels[0].awaitingOwnership === 'YES') {
          this.storeDashBoard$.dispatch(new dashBoardActions.OauthAttempt({ request: { businessUnitId: selectBusiness.id, channel: 'GOOGLE_MY_BUSINESS' } }))
        }
      }
    })
  )

  @Effect({ dispatch: false })
  getBusinessFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.GET_BUSINESS_UNITS_FAILURE),
    tap(payload => {
      this.storeDashBoard$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
    })
  )

  // ----------------- Request Admin Rights -----------------

  @Effect()
  requestAdminRightsAttempt$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.REQUEST_ADMIN_RIGHTS_ATTEMPT),
    switchMap((action: dashBoardActions.RequestAdminRightsAttempt) =>
      this.dashBoardService.requestAdminRights(action.payload).pipe(
        map((response: any) => {
          return response === null ? new dashBoardActions.RequestAdminRightsFailure({}) : new dashBoardActions.RequestAdminRightsSuccess(response)
        }),
        catchError(error => of(new dashBoardActions.RequestAdminRightsFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  requestAdminRightsFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.REQUEST_ADMIN_RIGHTS_FAILURE),
    tap(payload => {
      this.storeDashBoard$.dispatch(new dashBoardActions.ErrorLayoutShow({ error: payload }))
      this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect({ dispatch: false })
  requestAdminRightsSuccess$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.REQUEST_ADMIN_RIGHTS_SUCCESS),
    tap((action: dashBoardActions.RequestAdminRightsSuccess) => {
      // this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- Oauth tokens-----------------
  @Effect()
  OauthTokenRequest$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.OAUTH_TOKEN_ATTEMPT),
    switchMap((action: dashBoardActions.OauthAttempt) =>
      this.dashBoardService.oAuthTokens(action.payload.request).pipe(
        map((response: any) => {
          return response === null ? new dashBoardActions.OauthFailure() : new dashBoardActions.OauthSuccess()
        }),
        catchError(error => of(new dashBoardActions.OauthFailure({ error })))
      )
    )
  )

  // ----------------- Fetch Verification Options-----------------

  @Effect()
  fetchVerification$: Observable<Action> = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.FETCH_VERIFICATION_OPTIONS),
    switchMap((action: any) =>
      this.dashBoardService.fetchVerificationOptions(action.id, action.payload).pipe(
        map(response => {
          return new dashBoardActions.FetchVerificationOptionsSuccess(response)
        }),
        catchError(error => of(new dashBoardActions.FetchVerificationOptionsFailure(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  fetchVerificationFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.FETCH_VERIFICATION_OPTIONS_FAILURE),
    tap(payload => {
      this.storeDashBoard$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
    })
  )

  // ----------------- Init Verification-----------------

  @Effect()
  initVerification$: Observable<Action> = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.INIT_VERIFICATION),
    switchMap((action: any) =>
      this.dashBoardService.initializeVerification(action.id, action.payload).pipe(
        map(response => {
          return new dashBoardActions.InitVerificationSuccess(response)
        }),
        catchError(error => of(new dashBoardActions.InitVerificationFailure(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  initVerificationFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.INIT_VERIFICATION_FAILURE),
    tap(payload => {
      this.storeDashBoard$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
    })
  )

  // ----------------- Complete Verification-----------------

  @Effect()
  completeVerification$: Observable<Action> = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.COMPLETE_VERIFICATION),
    switchMap((action: any) =>
      this.dashBoardService.completeVerification(action.id, action.payload).pipe(
        map(response => {
          return new dashBoardActions.CompleteVerificationSuccess(response)
        }),
        catchError(error => of(new dashBoardActions.CompleteVerificationFailure(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  completeVerificationSuccess$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.COMPLETE_VERIFICATION_SUCCESS),
    tap(payload => {
      this.storeDashBoard$.dispatch(new dashBoardActions.GetAllBusinessAction())
    })
  )

  @Effect({ dispatch: false })
  completeVerificationFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.COMPLETE_VERIFICATION_FAILURE),
    tap(payload => {
      this.storeDashBoard$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
    })
  )

  constructor(private actions$: Actions, private router: Router, private storeDashBoard$: Store<fromModuleFeature.DashBoardState>, private dashBoardService: IDashBoardService) {}
}
