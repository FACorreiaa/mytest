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

  constructor(private actions$: Actions, private router: Router, private storeDashBoard$: Store<fromModuleFeature.DashBoardState>, private dashBoardService: IDashBoardService) {}
}
