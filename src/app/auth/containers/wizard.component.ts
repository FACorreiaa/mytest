import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Subscription, Observable } from 'rxjs'

import * as AuthActions from '../store/actions/auth.action'
import { AppRoutes as AuthRoutes } from '../../app.routing'
import * as fromApp from '../../app.reducers'
import * as fromModule from '../../app.reducers'
import { CategoriesService } from '@app/common/services/categories.service'

@Component({
  selector: 'app-wizard',
  templateUrl: 'wizard.component.html',
  styleUrls: ['wizard.component.scss'],
})
export class WizardComponent implements OnInit, OnDestroy {
  private userSubscription$: Subscription
  authorized: boolean
  offerings: Observable<any>

  constructor(private router: Router, private store: Store<fromApp.AppState>, private appStore: Store<fromModule.AppState>, private categoriesService: CategoriesService) {
    this.userSubscription$ = this.store.select(fromModule.userAuthorized).subscribe(authorized => {
      this.authorized = authorized
    })
  }

  ngOnInit() {
    this.appStore.dispatch(new AuthActions.Logout({}))
  }

  public ngOnDestroy() {
    this.userSubscription$.unsubscribe()
  }

  register(object): void {
    // console.log('userrrr', object)
    this.store.dispatch(new AuthActions.RegisterAttempt(object))
  }

  getOfferings(category: string) {
    this.categoriesService.getOfferings(category).subscribe(off => {
      if (!off) {
        this.offerings = null
      } else {
        this.offerings = off.filter(x => x.name === category)[0].offering
      }
    })
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
