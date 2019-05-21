import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { tap, switchMap, map, catchError } from 'rxjs/operators'
import { of, throwError } from 'rxjs'
import { Router } from '@angular/router'

import * as AuthActions from '../actions/auth.action'

import * as fromModule from '../../auth.reducer'
import { AuthState } from '../../auth.reducer'
import { reducerName } from '../../auth.reducer'
import { Action as ActionDispatched } from '../../../api/models/api-models'
import { AppRoutes as AuthRoutes } from '../../../app.routing'
import { IAuthorizationService } from '../../../api/interfaces/i.authorization.service'
import { IRestaurantAssistentService } from '../../../api/interfaces/i.restaurant-assistent.service'

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
        map(response => {
          return response == null ? new AuthActions.ManageBusinessFailure({}) : new AuthActions.ManageBusinessSuccess(response)
        }),
        catchError(error => of(new AuthActions.ManageBusinessFailure({ error })))
      )
    )
  )

  @Effect({ dispatch: false })
  manageBusinessFailure$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_FAILURE),
    tap(payload => {
      this.store$.dispatch(new AuthActions.ErrorLayoutShow(payload))
      this.router.navigate([AuthRoutes.ERROR])
    })
  )

  @Effect({ dispatch: false })
  manageBusinessSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.MANAGE_BUSINESS_SUCCESS),
    tap(() => {
      // this.router.navigate([AuthRoutes.MAIN])
    })
  )

  // ----------------- Restaurant Assistent -----------------

  @Effect()
  public restaurantAssistent$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.RESTAURANT_ASSISTENT_ATTEMPT),
    switchMap((action: any) =>
      this.restaurant.restaurantData().pipe(
        map((response: IHydraRestaurantDetailsResponse) => {
          return response.establishment === null ? new AuthActions.RestaurantAssistentFailure({}) : new AuthActions.RestaurantAssistentSuccess(response.establishment)
        }),
        catchError(error => of(new AuthActions.RestaurantAssistentFailure({ error })))
      )
    )
  )
}
