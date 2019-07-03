
import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action, Store } from '@ngrx/store'

import * as reviewActions from '../actions/review.actions'
import * as fromModuleFeature from '../../review.selector'
import { AppRoutes as AuthRoutes } from '../../../../app.routing'

import { IReviewService } from '@app/api/interfaces/i.review.service'
import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable()
export class ReviewEffects {
  // ----------------- Get Business -----------------

  @Effect()
  getBusiness$: Observable<Action> = this.actions$.pipe(
    ofType(reviewActions.ActionTypes.GET_BUSINESS_UNITS),
    switchMap((payload: any) =>
      this.reviewService.businessData().pipe(
        map((response: any) => {
          return new reviewActions.GetAllBusinessSuccessAction(response)
        }),
        catchError(error => of(new reviewActions.GetAllBusinessFailureAction(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  getBusinessSuccess$ = this.actions$.pipe(
    ofType(reviewActions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS),
    tap((action: reviewActions.GetAllBusinessSuccessAction) => {
      if (action.payload.length === 0) {
        this.router.navigate([AuthRoutes.WIZARD])
      } else {
        const selectBusiness = action.payload[action.payload.length - 1]

        if (selectBusiness.channels[0].awaitingOwnership === 'YES') {
          this.storeReview$.dispatch(new reviewActions.OauthAttempt({ request: { businessUnitId: selectBusiness.id, channel: 'GOOGLE_MY_BUSINESS' } }))
        }
      }
    })
  )

  @Effect({ dispatch: false })
  getBusinessFailure$ = this.actions$.pipe(
    ofType(reviewActions.ActionTypes.GET_BUSINESS_UNITS_FAILURE),
    tap(payload => {
      this.storeReview$.dispatch(new reviewActions.ErrorLayoutShow(payload))
    })
  )

  // ----------------- Request Admin Rights -----------------

  @Effect()
  requestAdminRightsAttempt$ = this.actions$.pipe(
    ofType(reviewActions.ActionTypes.REQUEST_ADMIN_RIGHTS_ATTEMPT),
    switchMap((action: reviewActions.RequestAdminRightsAttempt) =>
      this.reviewService.requestAdminRights(action.payload).pipe(
        map((response: any) => {
          return response === null ? new reviewActions.RequestAdminRightsFailure({}) : new reviewActions.RequestAdminRightsSuccess(response)
        }),
        catchError(error => of(new reviewActions.RequestAdminRightsFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  requestAdminRightsFailure$ = this.actions$.pipe(
    ofType(reviewActions.ActionTypes.REQUEST_ADMIN_RIGHTS_FAILURE),
    tap(payload => {
      this.storeReview$.dispatch(new reviewActions.ErrorLayoutShow({ error: payload }))
      this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect({ dispatch: false })
  requestAdminRightsSuccess$ = this.actions$.pipe(
    ofType(reviewActions.ActionTypes.REQUEST_ADMIN_RIGHTS_SUCCESS),
    tap((action: reviewActions.RequestAdminRightsSuccess) => {
      // this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- Oauth tokens-----------------
  @Effect()
  OauthTokenRequest$ = this.actions$.pipe(
    ofType(reviewActions.ActionTypes.OAUTH_TOKEN_ATTEMPT),
    switchMap((action: reviewActions.OauthAttempt) =>
      this.reviewService.oAuthTokens(action.payload.request).pipe(
        map((response: any) => {
          return response === null ? new reviewActions.OauthFailure() : new reviewActions.OauthSuccess()
        }),
        catchError(error => of(new reviewActions.OauthFailure({ error })))
      )
    )
  )

  constructor(private actions$: Actions, private router: Router, private storeReview$: Store<fromModuleFeature.ReviewState>, private reviewService: IReviewService) { }
}
