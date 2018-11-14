import { Component, OnDestroy, OnInit } from '@angular/core'
import { AppRoutes as AuthRoutes } from './app.routing'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromApp from './app.reducers'
import * as AuthActions from './auth/store/actions/auth.action'
import { takeUntil, delay } from 'rxjs/operators'

/**
 * The app component.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private userSubscription$: Subject<void> = new Subject<void>()

  authorized: boolean

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(
        delay(0),
        select(fromApp.userAuthorized),
        takeUntil(this.userSubscription$)
      )
      .subscribe(authorized => (this.authorized = authorized))
  }

  public ngOnDestroy() {
    this.userSubscription$.unsubscribe()
  }

  onLoginClick(event) {
    this.router.navigate([AuthRoutes.LOGIN])
  }

  onLogOutClick(event) {
    this.store.dispatch(new AuthActions.LogoutSuccess({}))
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
