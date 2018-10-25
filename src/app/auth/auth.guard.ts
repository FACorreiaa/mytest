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

  constructor(private store: Store<fromApp.AppState>, private router: Router, private settings: GlobalEnvironmentService) {
    const auth = localStorage.getItem(reducerName)
    const token = localStorage.getItem(this.settings.getTokenPath())

    // Validate if local storage contains user session.
    if (!auth || !token || token === null) {
      this.authorized = false
      this.navigateToLoginPage()
    }

    // Get user authorized status.
    this.subscription = store.select(fromApp.userAuthorized).subscribe(authorized => {
      this.authorized = authorized
    })
  }

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
    if (!this.authorized) {
      this.navigateToLoginPage()

      return false
    }

    return true
  }

  /**
   * Validate if can activate child route.
   * @param childRoute
   * @param state
   */
  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate()
  }

  /**
   * Navigate to login page.
   */
  private navigateToLoginPage(): void {
    this.router.navigate([AuthRoutes.LOGIN])
  }
}
