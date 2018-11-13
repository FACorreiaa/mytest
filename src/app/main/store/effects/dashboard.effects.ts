import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action, Store } from '@ngrx/store'

import * as dashBoardActions from '../actions/dashboard.actions'
import * as fromModule from '../../main.reducers'

import { IDashBoardService } from '@app/api/interfaces/i.dashboard.service'
import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { AppRoutes as AuthRoutes } from '../../../app.routing'
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
    tap(() => {
      // this.router.navigate([AuthRoutes.MAIN])
    })
  )

  @Effect({ dispatch: false })
  getBusinessFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.GET_BUSINESS_UNITS_FAILURE),
    tap(payload => {
      this.store$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
      this.router.navigate([AuthRoutes.ERROR])
    })
  )

  // ----------------- Edit Business -----------------

  @Effect()
  editBusiness$: Observable<Action> = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.EDIT_BUSINESS),
    switchMap((action: any) =>
      this.dashBoardService
        .editBusinessData(action.payload)
        .map((response: any) => new dashBoardActions.EditBusinessSuccessAction(response))
        .catch(error => of(new dashBoardActions.EditBusinessFailureAction(error)))
    )
  )

  @Effect({ dispatch: false })
  editBusinessFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.EDIT_BUSINESS_FAILURE),
    tap(payload => {
      this.store$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
      this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect({ dispatch: false })
  editBusinessSuccess$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.EDIT_BUSINESS_SUCCESS),
    tap(() => {
      this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- Add Business -----------------

  @Effect()
  public addBusiness$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.ADD_BUSINESS),
    switchMap((action: any) =>
      this.dashBoardService.addBusinessData(action.payload).pipe(
        map(response => {
          return new dashBoardActions.AddBusinessSuccessAction(response)
        }),
        catchError(error => of(new dashBoardActions.AddBusinessFailureAction({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  addBusinessFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.ADD_BUSINESS_FAILURE),
    tap(payload => {
      this.store$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
      this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect({ dispatch: false })
  addBusinessSuccess$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.ADD_BUSINESS_SUCCESS),
    tap(() => {
      this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- Remove Business -----------------

  @Effect()
  removeBusiness$: Observable<Action> = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.DELETE_BUSINESS),
    switchMap((payload: any) =>
      this.dashBoardService
        .removeBusinessData(payload)
        .map((response: any) => new dashBoardActions.DeleteBusinessSuccessAction(response))
        .catch(error => of(new dashBoardActions.DeleteBusinessFailureAction({ error })))
    )
  )

  @Effect({ dispatch: false })
  removeBusinessFailure$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.DELETE_BUSINESS_FAILURE),
    tap(payload => {
      this.store$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
      this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect({ dispatch: false })
  removeBusinessSuccess$ = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.DELETE_BUSINESS_SUCCESS),
    tap(() => {
      this.store$.dispatch(new dashBoardActions.GetAllBusinessAction())
    })
  )

  constructor(private actions$: Actions, private router: Router, private store$: Store<fromModule.MainState>, private dashBoardService: IDashBoardService) {}
}
