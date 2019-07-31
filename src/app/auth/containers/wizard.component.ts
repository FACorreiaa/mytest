import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { delay, takeUntil } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { Subject } from 'rxjs/internal/Subject'
import { Observable } from 'rxjs/Observable'
import { KeycloakService } from 'keycloak-angular'

import * as AuthActions from '../store/actions/auth.action'
import { AppRoutes as AuthRoutes } from '../../app.routing'
import * as fromMainApp from '../../main/main.selectors'
import { CategoriesService } from '@app/core/services/categories.service'
import { Countries, ICategory, ManageBusinessData, Establishment } from '@app/api/models/api-models'
import { CountriesService } from '@app/core/services/countries.service'

@Component({
  selector: 'app-wizard',
  templateUrl: 'wizard.component.html',
  styleUrls: ['wizard.component.scss'],
})
export class WizardComponent implements OnInit, OnDestroy {
  private language$: Subject<void> = new Subject<void>()

  authorized: boolean
  loading$: Observable<boolean>
  restaurant$: Observable<IHydraRestaurant>
  claimData$: Observable<ManageBusinessData>
  establisments$: Observable<Establishment[]>
  offerings$: Observable<ICategory[]>
  services$: Observable<ICategory[]>
  payments$: Observable<ICategory[]>
  countries$: Observable<Countries[]>

  constructor(
    private router: Router,
    private store: Store<fromMainApp.MainState>,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService,
    private readonly translate: TranslateService
  ) {
    this.loading$ = this.store.select(fromMainApp.loading)
    this.restaurant$ = this.store.select(fromMainApp.restaurantAssistent)
    this.claimData$ = this.store.select(fromMainApp.claimData)
    this.establisments$ = this.store.select(fromMainApp.getEstablisment)

    this.store.dispatch(new AuthActions.NavMenuLayoutHide())
  }

  async ngOnInit() {
    // ToDo, now the logic for the business to apply this call
    // this.store.dispatch(new AuthActions.RestaurantAssistentAttempt())

    // ToDo - isLoggedIn can be use to get roles information in the future
    // this.authorized = await this.keycloakService.isLoggedIn()

    this.translate.setDefaultLang('en')
    this.translate.addLangs(['en', 'fr', 'de', 'pt', 'es', 'hr', 'hu', 'it', 'nl', 'pl', 'ru', 'tr', 'uk', 'cs'])
    const browserLang = this.translate.getBrowserLang()
    this.translate.use(browserLang.match(/en|fr|de|pt|es|hr|hu|it|nl|pl|ru|tr|uk|cs/) ? browserLang : 'en')

    this.store
      .pipe(
        delay(0),
        select(fromMainApp.language),
        takeUntil(this.language$)
      )
      .subscribe(lang => this.translate.use(lang))

    this.countries$ = this.countriesService.getCountries()
    this.services$ = this.categoriesService.getServices()
    this.payments$ = this.categoriesService.getPayments()
    this.offerings$ = this.categoriesService.getOfferings()
  }

  public ngOnDestroy() {
    this.store.dispatch(new AuthActions.NavMenuLayoutShow())

    this.language$.next()
    this.language$.complete()
  }

  manageBusiness(object: ManageBusinessData): void {
    this.store.dispatch(new AuthActions.ManageBusinessAttempt(object))
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
