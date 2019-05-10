import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'

import * as fromModule from '../../app.reducers'
// import * as fromMain from '../main.reducers'
import { Observable } from 'rxjs'
import { CountriesService } from '@app/core/services/countries.service'
import { Countries, ICategory, Data, ManageBusinessData } from '@app/api/models/api-models'
// import * as Actions from '../store/actions/dashboard.actions'
import { AppRoutes as AuthRoutes } from '../../app.routing'
import { CategoriesService } from '@app/core/services/categories.service'

@Component({
  selector: 'business-detail',
  templateUrl: 'business-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessDetailComponent implements OnInit, OnChanges {
  businessObjectId?: any
  business$: Observable<any[]>
  countries$: Observable<Countries[]>
  offerings$: Observable<any[]>
  services$: Observable<ICategory[]>
  payments$: Observable<ICategory[]>
  allCategoryOfferings: any[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private store: Store<fromMain.MainState>,
    private appStore: Store<fromModule.AppState>,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService
  ) {
    // this.business$ = this.store.select(fromMain.getBusiness)

    this.countries$ = this.countriesService.getCountries()
    this.services$ = this.categoriesService.getServices()
    this.payments$ = this.categoriesService.getPayments()
    this.offerings$ = this.categoriesService.getOfferings()
  }

  ngOnInit(): void {
    this.businessObjectId = Number(this.route.snapshot.params.objId)
    // this.store.dispatch(new Actions.GetAllBusinessAction())
  }

  ngOnChanges(changes: SimpleChanges): void {}

  editBusiness(object: ManageBusinessData) {
    object.data.id = this.businessObjectId
    // this.store.dispatch(new Actions.EditBusinessAction(object))
  }

  GoToMainPage(event) {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
