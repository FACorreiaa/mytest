import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action, Store } from '@ngrx/store'

import * as dashBoardActions from '../actions/dashboard.actions'
import * as fromModuleFeature from '../../dashboard.reducer'

import { IDashBoardService } from '@app/api/interfaces/i.dashboard.service'
import { switchMap, catchError, map, tap } from 'rxjs/operators'
// import { AppRoutes as AuthRoutes } from '../../../app.routing'
import { Router } from '@angular/router'
import { FetchVerificationRequest } from '@app/api/models/api-models'
import { FetchVerificationOptions } from '../actions/dashboard.actions'

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
    tap(() => {
      // this.router.navigate([AuthRoutes.MAIN])
    })
  )

  @Effect({ dispatch: false })
  getBusinessFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.GET_BUSINESS_UNITS_FAILURE),
    tap(payload => {
      this.storeDashBoard$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
      // this.router.navigate([AuthRoutes.ERROR])
    })
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
      // this.router.navigate([AuthRoutes.ERROR])
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
      // this.router.navigate([AuthRoutes.ERROR])
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
  completeVerificationFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.COMPLETE_VERIFICATION_FAILURE),
    tap(payload => {
      this.storeDashBoard$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
      // this.router.navigate([AuthRoutes.ERROR])
    })
  )

  constructor(private actions$: Actions, private router: Router, private storeDashBoard$: Store<fromModuleFeature.DashBoardState>, private dashBoardService: IDashBoardService) {}
}
