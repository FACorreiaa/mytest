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

  constructor(
    private actions$: Actions,
    private router: Router,
    private storeProfile$: Store<fromModuleFeature.ProfileState>,
    private profileService: IProfileService) { }
}
