import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'

import * as fromModule from '../../app.reducers'
import * as fromMain from '../main.reducers'
import { Subject, Observable } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { CountriesService } from '@app/common/services/countries.service'
import { Countries, ICategory, Data } from '@app/api/models/api-models'
import * as Actions from '../store/actions/dashboard.actions'
import { CategoriesService } from '@app/common/services/categories.service'
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material'

@Component({
  selector: 'business-detail',
  templateUrl: 'business-detail.component.html',
})
export class BusinessDetailComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  businessToEdit: Data
  businessObjectId: number
  business$: any[]
  countries$: Observable<Countries[]>
  offerings: ICategory[] = []
  services$: ICategory[] = []
  payments$: ICategory[] = []

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromMain.MainState>,
    private appStore: Store<fromModule.AppState>,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService
  ) {
    this.businessObjectId = this.route.snapshot.params['objId']

    this.store.dispatch(new Actions.GetAllBusinessAction())
    this.store.pipe(select(fromMain.getBusiness), takeUntil(this.unsubscribe$)).subscribe(business => (this.business$ = business))

    this.countries$ = this.countriesService.getCountries()

    this.businessToEdit = this.business$.find(item => item.id === this.businessObjectId)
  }

  ngOnInit(): void {
    this.categoriesService.getOfferings(this.businessToEdit.category).subscribe(off => {
      if (!off) {
        this.offerings = null
      } else {
        if (off.filter(x => x.name === this.businessToEdit.category)[0]) {
          off.filter(x => x.name === this.businessToEdit.category)[0].offering.map(x => this.offerings.push({ name: x, selected: false }))

          this.offerings.map(x => {
            if (this.businessToEdit.offers.includes(x.name)) {
              x.selected = true
            }
          })
        } else {
          return null
        }
      }
    })

    this.categoriesService.getServices().subscribe(services => {
      services.map(x => this.services$.push({ name: x, selected: false }))

      this.services$.map(x => {
        if (this.businessToEdit.services && this.businessToEdit.services.includes(x.name)) {
          x.selected = true
        }
      })
    })

    this.categoriesService.getPayments().subscribe(payments => {
      payments.map(x => this.payments$.push({ name: x, selected: false }))

      this.payments$.map(x => {
        if (this.businessToEdit.paymentMethods && this.businessToEdit.paymentMethods.includes(x.name)) {
          x.selected = true
        }
      })

      console.log('onInittt', this.services$, this.businessToEdit.services)
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
