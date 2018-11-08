import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'

import * as fromModule from '../../app.reducers'
import * as fromMain from '../main.reducers'
import { Subject, Observable } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { CountriesService } from '@app/common/services/countries.service'
import { Countries, ICategory, Data, ManageBusinessData } from '@app/api/models/api-models'
import * as Actions from '../store/actions/dashboard.actions'
import { CategoriesService } from '@app/common/services/categories.service'

@Component({
  selector: 'business-detail',
  templateUrl: 'business-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessDetailComponent implements OnInit, OnChanges {
  businessToEdit: Data
  businessObjectId?: any
  business$: Observable<any[]>
  countries$: Observable<Countries[]>
  offerings: ICategory[] = []
  services: ICategory[] = []
  payments: ICategory[] = []
  allCategoryOfferings: any[]

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromMain.MainState>,
    private appStore: Store<fromModule.AppState>,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService
  ) {
    this.business$ = this.store.select(fromMain.getBusiness)
    this.countries$ = this.countriesService.getCountries()
  }

  ngOnInit(): void {
    this.businessObjectId = Number(this.route.snapshot.params.objId)
    this.store.dispatch(new Actions.GetAllBusinessAction())
  }

  setAllOfferings(business) {
    this.categoriesService.getOfferings(business.category).subscribe(off => {
      if (!off) {
        this.offerings = null
        this.allCategoryOfferings = []
      } else {
        this.allCategoryOfferings = off
        if (off.filter(x => x.name === business.category)[0]) {
          off.filter(x => x.name === business.category)[0].offering.map(x => this.offerings.push({ name: x, selected: false }))
          this.offerings.map(x => {
            if (business.offers.includes(x.name)) {
              x.selected = true
            }
          })
        } else {
          return null
        }
      }
    })

    this.categoriesService.getServices().subscribe(services => {
      services.map(x => this.services.push({ name: x, selected: false }))
      this.services.map(x => {
        if (business.services && business.services.includes(x.name)) {
          x.selected = true
        }
      })
    })

    this.categoriesService.getPayments().subscribe(payments => {
      payments.map(x => this.payments.push({ name: x, selected: false }))
      this.payments.map(x => {
        if (business.paymentMethods && business.paymentMethods.includes(x.name)) {
          x.selected = true
        }
      })
    })
  }

  ngOnChanges(changes: SimpleChanges): void {}

  getOfferings(category: string) {
    const aux = []
    this.allCategoryOfferings.filter(x => x.name === category)[0].offering.map(x => aux.push({ name: x, selected: false }))
    this.offerings = aux
  }

  editBusiness(object: ManageBusinessData) {
    console.log('object', object)
    return null
  }
}
