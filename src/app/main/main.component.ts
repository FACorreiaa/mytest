import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { faBroom } from '@fortawesome/free-solid-svg-icons'

import * as fromApp from '../app.reducers'
import * as fromMain from './main.selectors'

import { AppRoutes as AuthRoutes } from '../app.routing'
import * as AuthActions from '../auth/store/actions/auth.action'
import * as TermsActions from './store/actions/terms-cond.action'
import { Role } from '@app/api/models/api-models'

import { TranslateService } from '@ngx-translate/core'
import { delay, takeUntil, startWith, tap } from 'rxjs/operators'
import { HeaderService } from '@app/api/services/core/header.service'
import { Router } from '@angular/router'
import { KeycloakService } from 'keycloak-angular'
import { BusinessData } from '@app/api/models/api-models'
import { MatDialog } from '@angular/material'
import { CookieSettingsComponent } from './components/cookie-settings/cookie-settings.component'
import { TransferGmbComponent } from './components/transfer-gmb/transfer-gmb.component'

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  private language$: Subject<void> = new Subject<void>()
  private userSubscription$: Subject<void> = new Subject<void>()
  loading$: Observable<boolean>
  selectedLang: string
  token: any
  showNavBar$: boolean
  businessData$: Observable<BusinessData[]>
  languages = ['en', 'fr', 'de', 'pt', 'es', 'hr', 'hu', 'it', 'nl', 'pl', 'ru', 'tr', 'uk', 'cs']
  myRole: Role
  Role = Role
  faBroom = faBroom

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private mainStore: Store<fromMain.MainState>,
    private translate: TranslateService,
    public headerService: HeaderService,
    public dialog: MatDialog
  ) {
    this.businessData$ = this.mainStore.select(fromMain.getDashboardState)
    this.loading$ = this.mainStore.select(fromMain.getLoading)
    this.myRole = Role.user
  }

  ngOnInit() {
    this.mainStore.dispatch(new TermsActions.TermsConditionsAttempt())

    this.translate.setDefaultLang('en')

    console.log('languages', this.translate.langs)
    this.translate.addLangs(['en', 'fr', 'de', 'pt', 'es', 'hr', 'hu', 'it', 'nl', 'pl', 'ru', 'tr', 'uk', 'cs'])
    const browserLang = this.translate.getBrowserLang()
    this.translate.use(browserLang.match(/en|fr|de|pt|es|hr|hu|it|nl|pl|ru|tr|uk|cs/) ? browserLang : 'en')
    this.selectedLang = this.translate.currentLang
    this.store.dispatch(new AuthActions.ChangeLanguage({ language: this.selectedLang }))

    this.store
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.language$)
      )
      .subscribe(lang => {
        this.translate.use(lang)
      })
  }

  ngOnDestroy() {
    this.userSubscription$.next()
    this.userSubscription$.complete()

    this.language$.next()
    this.language$.complete()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainStore
        .select(fromMain.getNavBarState)
        .pipe(
          startWith(null),
          delay(0),
          tap(showNavBar => (this.showNavBar$ = showNavBar)),
          takeUntil(this.userSubscription$)
        )
        .subscribe()
    })
  }

  async onLogOutClick() {
    await this.keycloakService.logout()
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.WIZARD])
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new AuthActions.ChangeLanguage({ language }))
  }

  openCookies() {
    this.dialog.open(CookieSettingsComponent, {
      width: '800px',
    })
  }

  openTransfer() {
    this.dialog.open(TransferGmbComponent)
  }
}
