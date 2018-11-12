import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { CountriesService } from '@app/common/services/countries.service'
import { CategoriesService } from '@app/common/services/categories.service'

import { ICategory, Countries, ManageBusinessData } from '@app/api/models/api-models'
import * as MainActions from '../store/actions/dashboard.actions'
import { AppRoutes as AuthRoutes } from '../../app.routing'
import * as fromApp from '../../app.reducers'
import * as fromModule from '../../app.reducers'

@Component({
  selector: 'add-business',
  templateUrl: 'add-business.component.html',
})
export class AddBusinessComponent implements OnInit, OnChanges, OnDestroy {
  private userSubscription$: Subscription
  authorized: boolean
  loading$: Observable<boolean>
  offerings: ICategory[] = []
  services: ICategory[] = []
  payments: ICategory[] = []
  countries$: Countries[]
  allCategoryOfferings: any[]

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
    this.countriesService.getCountries().subscribe(countries => {
      this.countries$ = countries
    })
  }

  ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy() {
    this.userSubscription$.unsubscribe()
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

    this.categoriesService.getServices().subscribe(services => {
      services.map(x => this.services.push({ name: x, selected: false }))
    })

    this.categoriesService.getPayments().subscribe(payments => {
      payments.map(x => this.payments.push({ name: x, selected: false }))
    })
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }

  addBusiness(object: ManageBusinessData) {
    console.log('object', object)

    this.store.dispatch(new MainActions.AddBusinessAction(object))
  }
}
