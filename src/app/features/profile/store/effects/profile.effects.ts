import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action, Store } from '@ngrx/store'

import * as profileActions from '../actions/profile.actions'
import * as fromModuleFeature from '../../profile.selector'

import * as dashboardActions from '../../../../features/dashboard/store/actions/dashboard.actions'
import * as fromDashboard from '../../../../features/dashboard/dashboard.selector'

import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { IProfileService } from '@app/api/interfaces/i.profile.service'

@Injectable()
export class ProfileEffects {
  // ----------------- Update Business -----------------

  @Effect()
  updateBusiness$: Observable<Action> = this.actions$.pipe(
    ofType(profileActions.ActionTypes.UPDATE_BUSINESS_ATTEMPT),
    switchMap((action: profileActions.UpdateBusinessAttempt) =>
      this.profileService.updateBusinessData(action.payload.request).pipe(
        map((response: any) => {
          return new profileActions.UpdateBusinessSuccess(true)
        }),
        catchError(error => of(new profileActions.UpdateBusinessFailure(error)))
      )
    )
  )

  @Effect({ dispatch: false })
  updateBusinessSuccess$ = this.actions$.pipe(
    ofType(profileActions.ActionTypes.UPDATE_BUSINESS_SUCCESS),
    map(() => {
      this.storeDashboard$.dispatch(new dashboardActions.GetAllBusinessAction())
    })
  )

  constructor(
    private actions$: Actions,
    private storeDashboard$: Store<fromDashboard.DashBoardState>,
    private storeProfile$: Store<fromModuleFeature.ProfileState>,
    private profileService: IProfileService
  ) {}
}
