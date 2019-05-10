import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { CountriesService } from '@app/core/services/countries.service'
import { CategoriesService } from '@app/core/services/categories.service'

import { ICategory, Countries, ManageBusinessData } from '@app/api/models/api-models'
// import * as MainActions from '../store/actions/dashboard.actions'
import { AppRoutes as AuthRoutes } from '../../app.routing'
import * as fromApp from '../../app.reducers'
import * as fromModule from '../../app.reducers'

@Component({
  selector: 'add-business',
  templateUrl: 'add-business.component.html',
})
export class AddBusinessComponent implements OnInit {
  authorized: boolean
  loading$: Observable<boolean>
  offerings$: Observable<ICategory[]>
  services$: Observable<ICategory[]>
  payments$: Observable<ICategory[]>
  countries$: Observable<Countries[]>
  allCategoryOfferings: any[]

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private appStore: Store<fromModule.AppState>,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService
  ) {
    this.loading$ = this.store.select(fromApp.loginLoading)
  }

  ngOnInit() {
    this.countries$ = this.countriesService.getCountries()

    this.services$ = this.categoriesService.getServices()
    this.payments$ = this.categoriesService.getPayments()
    this.offerings$ = this.categoriesService.getOfferings()
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }

  addBusiness(object: ManageBusinessData) {
    // console.log('object', object)
    // this.store.dispatch(new MainActions.AddBusinessAction(object))
  }
}
