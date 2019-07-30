import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { tap, map, catchError, mergeMap, switchMap } from 'rxjs/operators'
import { of } from 'rxjs/internal/observable/of'
import { Store } from '@ngrx/store'

import { Router } from '@angular/router'

import * as TermsActions from '@app/main/store/actions/terms-cond.action'
import { AppRoutes as AuthRoutes } from '../../../app.routing'
import { IAuthorizationService } from '../../../api/interfaces/i.authorization.service'
import { BootstrapResponse, TermsAndConditions } from '@app/api/models/api-models'
import * as fromModuleMain from '../../main.selectors'

@Injectable()
export class TermsConditionsEffects {
  constructor(private actions$: Actions, private auth: IAuthorizationService, private storeAuth$: Store<fromModuleMain.MainState>, private router: Router) {}

  // ----------------- Terms and Conditions -----------------
  @Effect()
  public termsConditions$ = this.actions$.pipe(
    ofType(TermsActions.TermsActionTypes.TERMS_CONDITIONS_ATTEMPT),
    mergeMap(() =>
      this.auth.bootstrap().pipe(
        map((payload: BootstrapResponse) => {
          return payload === null ? new TermsActions.TermsConditionsFailure() : new TermsActions.TermsConditionsSuccess({ response: payload })
        }),
        catchError(error => of(new TermsActions.TermsConditionsFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  termsConditionsSuccess$ = this.actions$.pipe(
    ofType(TermsActions.TermsActionTypes.TERMS_CONDITIONS_SUCCESS),
    tap(() => {
      // TODO: Do we really need to check if the user has already something??
      this.storeAuth$.dispatch(new TermsActions.GetBusinessUnitsAttempt())
      // this.router.navigate([AuthRoutes.MAIN])
    })
  )

  @Effect()
  termsConditionsUpdate$ = this.actions$.pipe(
    ofType(TermsActions.TermsActionTypes.TERMS_CONDITIONS_UPDATE_ATTEMPT),
    mergeMap((action: TermsActions.TermsConditionsUpdateAttempt) =>
      this.auth.termsConditionsSave(action.payload.request).pipe(
        map((payload: TermsAndConditions) => {
          return payload === null ? new TermsActions.TermsConditionsUpdateFailure() : new TermsActions.TermsConditionsUpdateSuccess({ update: payload })
        }),
        catchError(error => of(new TermsActions.TermsConditionsUpdateFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  termsConditionsUpdateSuccess$ = this.actions$.pipe(
    ofType(TermsActions.TermsActionTypes.TERMS_CONDITIONS_UPDATE_SUCCESS),
    tap(() => {
      this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- Get Business -----------------

  @Effect()
  getBusiness$ = this.actions$.pipe(
    ofType(TermsActions.TermsActionTypes.GET_BUSINESS_UNITS),
    switchMap(() =>
      this.auth.businessData().pipe(
        map((response: any) => {
          return new TermsActions.GetBusinessUnitsSuccess(response)
        }),
        catchError(error => of(new TermsActions.GetBusinessUnitsFailure(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  getBusinessSuccess$ = this.actions$.pipe(
    ofType(TermsActions.TermsActionTypes.GET_BUSINESS_UNITS_SUCCESS),
    tap((action: TermsActions.GetBusinessUnitsSuccess) => {
      if (action.payload.length === 0) {
        this.router.navigate([AuthRoutes.WIZARD])
      } else {
        this.router.navigate([AuthRoutes.MAIN])
      }
    })
  )

  @Effect({ dispatch: false })
  getBusinessFailure$ = this.actions$.pipe(
    ofType(TermsActions.TermsActionTypes.GET_BUSINESS_UNITS_FAILURE),
    tap(payload => {
      // TODO: Redirect to Error Page
      // this.storeDashBoard$.dispatch(new dashBoardActions.ErrorLayoutShow(payload))
    })
  )
}
