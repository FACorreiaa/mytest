import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { delay, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs/internal/Subject'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'

import * as Actions from '../store/actions/profile.actions'
import * as fromProfile from '../profile.selector'
import * as fromApp from '../../../app.reducers'
import * as fromMain from '../../../main/main.selectors'

import { ICategory, Countries, BusinessData, ICategoryDto, ManageBusinessData, UpdateBusinessData } from '@app/api/models/api-models'
import { CategoriesService } from '@app/core/services/categories.service'
import { CountriesService } from '@app/core/services/countries.service'

import { AppRoutes as AuthRoutes } from '../../../app.routing'

@Component({
  selector: 'profile-feature',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private language$: Subject<void> = new Subject<void>()

  profileData$: Observable<BusinessData[]>
  updateProfile$: Observable<boolean>
  authorized: boolean
  loading$: Observable<boolean>
  offerings$: Observable<ICategory[]>
  services$: Observable<ICategory[]>
  payments$: Observable<ICategoryDto[]>
  countries$: Observable<Countries[]>

  activeTab = 'basic'

  constructor(
    private router: Router,
    private appstore: Store<fromApp.AppState>,
    private mainStore: Store<fromMain.MainState>,
    private store: Store<fromProfile.ProfileState>,
    private translate: TranslateService,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService
  ) {
    this.loading$ = this.appstore.select(fromApp.loading)
    this.profileData$ = this.mainStore.select(fromMain.getDashboardState)
    this.updateProfile$ = this.store.select(fromProfile.getUpdateProfile)
  }

  ngOnInit() {
    // this.translate.setDefaultLang('en')

    this.translate.setDefaultLang('en')
    this.translate.addLangs(['en', 'fr', 'de', 'pt'])
    const browserLang = this.translate.getBrowserLang()
    this.translate.use(browserLang.match(/en|fr|de|pt/) ? browserLang : 'en')

    this.appstore
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.language$)
      )
      .subscribe(lang => this.translate.use(lang))

    this.store.dispatch(new Actions.ErrorLayoutHide())

    this.countries$ = this.countriesService.getCountries()
    this.services$ = this.categoriesService.getServices()
    this.payments$ = this.categoriesService.getPayments()
    this.offerings$ = this.categoriesService.getProfileOfferings()
  }

  public ngOnDestroy() {
    this.language$.next()
    this.language$.complete()
  }

  updateBusiness(updateBusiness: UpdateBusinessData) {
    this.store.dispatch(new Actions.UpdateBusinessAttempt({ request: updateBusiness }))
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
