import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { Router } from '@angular/router'

import * as AuthActions from '../actions/auth.action'

import * as fromModule from '../../auth.selector'
import { AppRoutes as AuthRoutes } from '../../../app.routing'
import { IAuthorizationService } from '../../../api/interfaces/i.authorization.service'
import { IRestaurantAssistentService } from '../../../api/interfaces/i.restaurant-assistent.service'
import { BusinessUnitManageResponse, BaseServiceResponse } from '@app/api/models/api-models'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth: IAuthorizationService,
    private restaurant: IRestaurantAssistentService,
    private router: Router,
    private store$: Store<fromModule.AuthState>
  ) {}

  // ----------------- Manage Business -----------------

  @Effect()
  public manageBusiness$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_ATTEMPT),
    switchMap((action: any) =>
      this.auth.manageBusiness(action.payload).pipe(
        map((response: BaseServiceResponse<BusinessUnitManageResponse>) => {
          return response === null ? new AuthActions.ManageBusinessFailure({}) : new AuthActions.ManageBusinessSuccess({ manageResponse: response.data[0] })
        }),
        catchError(error => of(new AuthActions.ManageBusinessFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  manageBusinessFailure$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_FAILURE),
    tap(payload => {
      this.store$.dispatch(new AuthActions.ErrorLayoutShow({ error: payload }))
      // this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect({ dispatch: false })
  manageBusinessSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_SUCCESS),
    tap((action: AuthActions.ManageBusinessSuccess) => {
      if (action.payload.manageResponse.GOOGLE_MY_BUSINESS.status === 409) {
        this.store$.dispatch(new AuthActions.RequestAdminRightsAttempt(action.payload.manageResponse.GOOGLE_MY_BUSINESS.requestBody))
      } else {
        this.router.navigate([AuthRoutes.MAIN])
      }
    })
  )

  // ----------------- Request Admin Rights -----------------

  @Effect()
  requestAdminRightsAttempt$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REQUEST_ADMIN_RIGHTS_ATTEMPT),
    mergeMap((action: AuthActions.RequestAdminRightsAttempt) =>
      this.auth.requestAdminRights(action.payload).pipe(
        map((response: any) => {
          return response === null ? new AuthActions.RequestAdminRightsFailure({}) : new AuthActions.RequestAdminRightsSuccess(response)
        }),
        catchError(error => of(new AuthActions.RequestAdminRightsFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  requestAdminRightsFailure$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REQUEST_ADMIN_RIGHTS_FAILURE),
    tap(payload => {
      console.log('error', payload)
      this.store$.dispatch(new AuthActions.ErrorLayoutShow({ error: payload }))
      // this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect({ dispatch: false })
  requestAdminRightsSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.REQUEST_ADMIN_RIGHTS_SUCCESS),
    tap((action: AuthActions.RequestAdminRightsSuccess) => {
      this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- Restaurant Assistent -----------------

  @Effect()
  public restaurantAssistent$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.RESTAURANT_ASSISTENT_ATTEMPT),
    mergeMap((action: any) =>
      this.restaurant.restaurantData().pipe(
        map((response: IHydraRestaurantDetailsResponse) => {
          return response.establishment === null
            ? new AuthActions.RestaurantAssistentFailure({})
            : new AuthActions.RestaurantAssistentSuccess({ restaurant: response.establishment })
        }),
        catchError(error => of(new AuthActions.RestaurantAssistentFailure({ error })))
      )
    )
  )
}
