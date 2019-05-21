import { Component, OnInit, OnDestroy } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Observable, Subject } from 'rxjs'
import { ICategory, Countries, UserRegisterDto } from '@app/api/models/api-models'
import { CategoriesService } from '@app/core/services/categories.service'
import { CountriesService } from '@app/core/services/countries.service'
import { Router, Data } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { delay, takeUntil } from 'rxjs/operators'
import * as AuthActions from '../../../auth/store/actions/auth.action'
import * as fromApp from '../../../app.reducers'
import { AppRoutes as AuthRoutes } from '../../../app.routing'


@Component({
  selector: 'profile-feature',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private language$: Subject<void> = new Subject<void>()

  profileData$: Observable<Data[]>
  authorized: boolean
  loading$: Observable<boolean>
  offerings$: Observable<ICategory[]>
  services$: Observable<ICategory[]>
  payments$: Observable<ICategory[]>
  countries$: Observable<Countries[]>

  activeTab = 'basic'

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService
  ) {
    this.loading$ = this.store.select(fromApp.loginLoading)
  }

  async ngOnInit() {
    this.translate.setDefaultLang('en')

    this.countries$ = this.countriesService.getCountries()
    this.services$ = this.categoriesService.getServices()
    this.payments$ = this.categoriesService.getPayments()
    this.offerings$ = this.categoriesService.getOfferings()

    this.store
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

  register(object: UserRegisterDto): void {
    this.store.dispatch(new AuthActions.ManageBusinessAttempt(object.claim))
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
