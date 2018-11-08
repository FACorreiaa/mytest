import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action, Store } from '@ngrx/store'

import * as dashBoardActions from '../actions/dashboard.actions'

import { IDashBoardService } from '@app/api/interfaces/i.dashboard.service'
import { switchMap } from 'rxjs/operators'

@Injectable()
export class DashBoardEffects {
  @Effect()
  public getBusiness$: Observable<Action> = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.GET_BUSINESS_UNITS),
    switchMap((payload: any) =>
      this.dashBoardService
        .businessData()
        .map((response: any) => new dashBoardActions.GetAllBusinessSuccessAction(response))
        .catch(error => of(new dashBoardActions.GetAllBusinessFailureAction(error)))
    )
  )

  public editBusiness$: Observable<Action> = this.actions$.pipe(
    ofType(dashBoardActions.ActionTypes.EDIT_BUSINESS),
    switchMap((payload: any) =>
      this.dashBoardService
        .editBusinessData()
        .map((response: any) => new dashBoardActions.EditBusinessSuccessAction(response))
        .catch(error => of(new dashBoardActions.EditBusinessFailureAction(error)))
    )
  )

  constructor(private actions$: Actions, private dashBoardService: IDashBoardService) {}
}
