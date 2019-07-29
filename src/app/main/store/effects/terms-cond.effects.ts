import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { tap, map, catchError, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs/internal/observable/of'

import { Router } from '@angular/router'

import * as TermsActions from '@app/main/store/actions/terms-cond.action'
import { AppRoutes as AuthRoutes } from '../../../app.routing'
import { IAuthorizationService } from '../../../api/interfaces/i.authorization.service'
import { BootstrapResponse, TermsAndConditions } from '@app/api/models/api-models'

@Injectable()
export class TermsConditionsEffects {
  constructor(private actions$: Actions, private auth: IAuthorizationService, private router: Router) {}

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
      this.router.navigate([AuthRoutes.MAIN])
    })
  )

  @Effect()
  public termsConditionsUpdate$ = this.actions$.pipe(
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
}
