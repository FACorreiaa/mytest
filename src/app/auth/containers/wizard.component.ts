import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Subscription, Observable } from 'rxjs'

import * as AuthActions from '../store/actions/auth.action'
import { AppRoutes as AuthRoutes } from '../../app.routing'
import * as fromApp from '../../app.reducers'
import * as fromModule from '../../app.reducers'
import { CategoriesService } from '@app/common/services/categories.service'
import { UserRegisterDto, Countries, ICategory } from '@app/api/models/api-models'
import { CountriesService } from '@app/common/services/countries.service'

@Component({
  selector: 'app-wizard',
  templateUrl: 'wizard.component.html',
  styleUrls: ['wizard.component.scss'],
})
export class WizardComponent implements OnInit, OnChanges, OnDestroy {
  private userSubscription$: Subscription
  authorized: boolean
  loading$: Observable<boolean>
  offerings: ICategory[] = []
  services$: Observable<ICategory[]>
  payments$: Observable<ICategory[]>
  countries$: Observable<Countries[]>

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private appStore: Store<fromModule.AppState>,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService
  ) {
    this.userSubscription$ = this.store.select(fromModule.userAuthorized).subscribe(authorized => {
      this.authorized = authorized
    })

    this.loading$ = this.store.select(fromApp.loginLoading)
  }

  ngOnInit() {
    this.countries$ = this.countriesService.getCountries()
    this.services$ = this.categoriesService.getServices()
    this.payments$ = this.categoriesService.getPayments()

    this.appStore.dispatch(new AuthActions.Logout({}))
  }

  ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy() {
    this.userSubscription$.unsubscribe()
  }

  register(object: UserRegisterDto): void {
    this.store.dispatch(new AuthActions.RegisterAttempt(object))
  }

  getOfferings(category: string) {
    this.categoriesService.getOfferings(category).subscribe(off => {
      if (!off) {
        this.offerings = null
      } else {
        const aux = []
        off.filter(x => x.name === category)[0].offering.map(x => aux.push({ name: x, selected: false }))
        this.offerings = aux
      }
    })
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
