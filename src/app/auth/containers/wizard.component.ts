import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Subscription, Observable, Subject } from 'rxjs'

import * as AuthActions from '../store/actions/auth.action'
import { AppRoutes as AuthRoutes } from '../../app.routing'
import * as fromApp from '../../app.reducers'
import * as fromModule from '../../app.reducers'
import { CategoriesService } from '@app/core/services/categories.service'
import { UserRegisterDto, Countries, ICategory } from '@app/api/models/api-models'
import { CountriesService } from '@app/core/services/countries.service'
import { delay, takeUntil } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { KeycloakService } from 'keycloak-angular'

@Component({
  selector: 'app-wizard',
  templateUrl: 'wizard.component.html',
  styleUrls: ['wizard.component.scss'],
})
export class WizardComponent implements OnInit, OnDestroy {
  private language$: Subject<void> = new Subject<void>()

  authorized: boolean
  loading$: Observable<boolean>
  offerings$: Observable<ICategory[]>
  services$: Observable<ICategory[]>
  payments$: Observable<ICategory[]>
  countries$: Observable<Countries[]>

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private categoriesService: CategoriesService,
    private countriesService: CountriesService,
    private readonly translate: TranslateService
  ) {
    this.loading$ = this.store.select(fromApp.loginLoading)
  }

  async ngOnInit() {
    this.translate.setDefaultLang('en')

    // this.authorized = await this.keycloakService.isLoggedIn()

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

  public ngOnDestroy() {
    this.language$.unsubscribe()
  }

  register(object: UserRegisterDto): void {
    this.store.dispatch(new AuthActions.ManageBusinessAttempt(object.claim))
    // this.GoToMainPage()
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
