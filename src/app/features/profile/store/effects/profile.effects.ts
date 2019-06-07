import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action, Store } from '@ngrx/store'

import * as profileActions from '../actions/profile.actions'
import * as fromModuleFeature from '../../profile.selector'

import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { IProfileService } from '@app/api/interfaces/i.profile.service'

@Injectable()
export class ProfileEffects {
  // ----------------- Get Business -----------------

  @Effect()
  getBusiness$: Observable<Action> = this.actions$.pipe(
    ofType(profileActions.ActionTypes.GET_BUSINESS_UNITS),
    switchMap((payload: any) =>
      this.profileService.businessData().pipe(
        map((response: any) => {
          return new profileActions.GetAllBusinessSuccessAction(response)
        }),
        catchError(error => of(new profileActions.GetAllBusinessFailureAction(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  getBusinessSuccess$ = this.actions$.pipe(
    ofType(profileActions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS),
    tap(() => {
      // this.router.navigate([AuthRoutes.MAIN])
    })
  )

  @Effect({ dispatch: false })
  getBusinessFailure$ = this.actions$.pipe(
    ofType(profileActions.ActionTypes.GET_BUSINESS_UNITS_FAILURE),
    tap(payload => {
      this.storeProfile$.dispatch(new profileActions.ErrorLayoutShow(payload))
    })
  )

  // ----------------- Fetch Verification Options-----------------

  @Effect()
  fetchVerification$: Observable<Action> = this.actions$.pipe(
    ofType(profileActions.ActionTypes.FETCH_VERIFICATION_OPTIONS),
    switchMap((action: any) =>
      this.profileService.fetchVerificationOptions(action.id, action.payload).pipe(
        map(response => {
          return new profileActions.FetchVerificationOptionsSuccess(response)
        }),
        catchError(error => of(new profileActions.FetchVerificationOptionsFailure(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  fetchVerificationFailure$ = this.actions$.pipe(
    ofType(profileActions.ActionTypes.FETCH_VERIFICATION_OPTIONS_FAILURE),
    tap(payload => {
      this.storeProfile$.dispatch(new profileActions.ErrorLayoutShow(payload))
    })
  )

  // ----------------- Init Verification-----------------

  @Effect()
  initVerification$: Observable<Action> = this.actions$.pipe(
    ofType(profileActions.ActionTypes.INIT_VERIFICATION),
    switchMap((action: any) =>
      this.profileService.initializeVerification(action.id, action.payload).pipe(
        map(response => {
          return new profileActions.InitVerificationSuccess(response)
        }),
        catchError(error => of(new profileActions.InitVerificationFailure(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  initVerificationFailure$ = this.actions$.pipe(
    ofType(profileActions.ActionTypes.INIT_VERIFICATION_FAILURE),
    tap(payload => {
      this.storeProfile$.dispatch(new profileActions.ErrorLayoutShow(payload))
    })
  )

  // ----------------- Complete Verification-----------------

  @Effect()
  completeVerification$: Observable<Action> = this.actions$.pipe(
    ofType(profileActions.ActionTypes.COMPLETE_VERIFICATION),
    switchMap((action: any) =>
      this.profileService.completeVerification(action.id, action.payload).pipe(
        map(response => {
          return new profileActions.CompleteVerificationSuccess(response)
        }),
        catchError(error => of(new profileActions.CompleteVerificationFailure(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  completeVerificationSuccess$ = this.actions$.pipe(
    ofType(profileActions.ActionTypes.COMPLETE_VERIFICATION_SUCCESS),
    tap(payload => {
      this.storeProfile$.dispatch(new profileActions.GetAllBusinessAction())
    })
  )

  @Effect({ dispatch: false })
  completeVerificationFailure$ = this.actions$.pipe(
    ofType(profileActions.ActionTypes.COMPLETE_VERIFICATION_FAILURE),
    tap(payload => {
      this.storeProfile$.dispatch(new profileActions.ErrorLayoutShow(payload))
    })
  )

  constructor(private actions$: Actions, private router: Router, private storeProfile$: Store<fromModuleFeature.ProfileState>, private profileService: IProfileService) {}
}
