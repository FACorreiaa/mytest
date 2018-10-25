import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Subscription, Observable } from 'rxjs'

import * as AuthActions from '../store/actions/auth.action'
import { AppRoutes as AuthRoutes } from '../../app.routing'
import * as fromApp from '../../app.reducers'
import * as fromModule from '../../app.reducers'
import { CategoriesService } from '@app/common/services/categories.service'
import { UserRegisterDto } from '@app/api/models/api-models'

@Component({
  selector: 'app-wizard',
  templateUrl: 'wizard.component.html',
  styleUrls: ['wizard.component.scss'],
})
export class WizardComponent implements OnInit, OnDestroy {
  private userSubscription$: Subscription
  authorized: boolean
  offerings: Observable<any>
  services: Observable<any>
  payments: Observable<any>

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

  register(object: UserRegisterDto): void {
    this.store.dispatch(new AuthActions.RegisterAttempt(object.user))
  }

  getOfferings(category: string) {
    this.categoriesService.getOfferings(category).subscribe(off => {
      if (!off) {
        this.offerings = null
      } else {
        this.offerings = off.filter(x => x.name === category)[0].offering
      }
    })

    this.categoriesService.getServices().subscribe(services => {
      this.services = services
    })

    this.categoriesService.getPayments().subscribe(payments => {
      this.payments = payments
    })
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
