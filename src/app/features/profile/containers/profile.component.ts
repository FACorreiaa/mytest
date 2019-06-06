import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'

import * as Actions from '../store/actions/profile.actions'
import * as fromProfile from '../profile.selector'
import * as fromApp from '../../../app.reducers'

import { Observable, Subject } from 'rxjs'
import { delay, takeUntil } from 'rxjs/operators'

import { ICategory, Countries, BusinessData } from '@app/api/models/api-models'
import { CategoriesService } from '@app/core/services/categories.service'
import { CountriesService } from '@app/core/services/countries.service'

import { Router } from '@angular/router'
import { AppRoutes as AuthRoutes } from '../../../app.routing'

@Component({
  selector: 'profile-feature',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private language$: Subject<void> = new Subject<void>()

  profileData$: Observable<BusinessData[]>
  authorized: boolean
  loading$: Observable<boolean>
  offerings$: Observable<ICategory[]>
  services$: Observable<ICategory[]>
  payments$: Observable<ICategory[]>
  countries$: Observable<Countries[]>

  activeTab = 'basic'

  constructor(
    private router: Router,
    private appstore: Store<fromApp.AppState>,
    private store: Store<fromProfile.ProfileState>,
    private translate: TranslateService,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService
  ) {
    this.loading$ = this.appstore.select(fromApp.loading)
    this.profileData$ = this.store.select(fromProfile.getProfileBusinessList)
  }

  async ngOnInit() {
    this.translate.setDefaultLang('en')

    this.store.dispatch(new Actions.GetAllBusinessAction())

    this.countries$ = this.countriesService.getCountries()
    this.services$ = this.categoriesService.getServices()
    this.payments$ = this.categoriesService.getPayments()
    this.offerings$ = this.categoriesService.getOfferings()

    this.appstore
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.language$)
      )
      .subscribe(lang => this.translate.use(lang))
  }

  public setActiveTab(tabId: string) {
    this.activeTab = tabId
  }

  public isActiveTab(tabId: string) {
    return tabId === this.activeTab
  }

  public ngOnDestroy() {
    this.language$.unsubscribe()
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
