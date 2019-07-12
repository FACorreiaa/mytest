import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action, Store } from '@ngrx/store'

import * as reviewActions from '../actions/review.actions'
import * as fromModuleFeature from '../../review.selector'
import { AppRoutes as AuthRoutes } from '../../../../app.routing'

import { IReviewService } from '@app/api/interfaces/i.reviews.service'
import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { ReviewsResponse } from '@app/api/models/api-models'

@Injectable()
export class ReviewEffects {
  // ----------------- Get Reviews -----------------

  @Effect()
  getReviews$: Observable<Action> = this.actions$.pipe(
    ofType(reviewActions.ActionTypes.GET_REVIEWS_ATTEMPT),
    switchMap((action: reviewActions.GetAllReviewsAttempt) =>
      this.reviewService.reviews(action.payload.establishmentId).pipe(
        map((payload: ReviewsResponse) => {
          return new reviewActions.GetAllReviewsSuccess({ response: payload })
        }),
        catchError(error => of(new reviewActions.GetAllReviewsFailure(error)))
      )
    )
  )

  @Effect()
  updateReview$: Observable<Action> = this.actions$.pipe(
    ofType(reviewActions.ActionTypes.UPDATE_REVIEWS_ATTEMPT),
    switchMap((action: reviewActions.UpdateReviewAttempt) =>
      this.reviewService.updateReview(action.payload.request).pipe(
        map((payload: any) => {
          return new reviewActions.UpdateReviewSuccess()
        }),
        catchError(error => of(new reviewActions.UpdateReviewFailure(error)))
      )
    )
  )

  @Effect()
  deleteReview$: Observable<Action> = this.actions$.pipe(
    ofType(reviewActions.ActionTypes.DELETE_REVIEWS_ATTEMPT),
    switchMap((action: reviewActions.DeleteReviewAttempt) =>
      this.reviewService.deleteReview(action.payload.request).pipe(
        map((payload: any) => {
          return new reviewActions.DeleteReviewSuccess()
        }),
        catchError(error => of(new reviewActions.DeleteReviewFailure(error)))
      )
    )
  )

  constructor(private actions$: Actions, private storeReview$: Store<fromModuleFeature.ReviewState>, private reviewService: IReviewService) {}
}
