import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Injectable, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { GlobalEnvironmentService } from '../global.environment.service'
import { AppRoutes as AuthRoutes } from '../app.routing'
import { reducerName } from './auth.reducer'
import * as fromApp from '../app.reducers'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, OnDestroy {
  private authorized: boolean
  private subscription: Subscription
  private permissionSubscription

  constructor(private store: Store<fromApp.AppState>, private router: Router, private settings: GlobalEnvironmentService) {}

  /**
   * Angular ngOnDestroy method.
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.permissionSubscription.unsubscribe()
  }

  /**
   * Validate if can activate route.
   */
  public canActivate(): boolean {
    console.log('canActivate')
    // if (!this.authorized) {
    //   this.navigateToLoginPage()

    //   return false
    // }

    return true
  }

  /**
   * Validate if can activate child route.
   * @param childRoute
   * @param state
   */
  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    console.log('canActivateChild')

    return this.canActivate()
  }

  /**
   * Navigate to login page.
   */
  private navigateToLoginPage(): void {
    console.log('navigateToLoginPage')

    // this.router.navigate([AuthRoutes.LOGIN])
  }
}
