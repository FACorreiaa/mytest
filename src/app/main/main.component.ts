import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable, Subject, of } from 'rxjs'

import * as fromApp from '../app.reducers'
import * as fromMain from './main.selectors'

import { AppRoutes as AuthRoutes } from '../app.routing'
import * as AuthActions from '../auth/store/actions/auth.action'
import * as TermsActions from './store/actions/terms-cond.action'

import { TranslateService } from '@ngx-translate/core'
import { delay, takeUntil, startWith, tap } from 'rxjs/operators'
import { HeaderService } from '@app/api/services/core/header.service'
import { Router } from '@angular/router'
import { KeycloakService } from 'keycloak-angular'
import { TermsConditionsGetResponse, BusinessData } from '@app/api/models/api-models'
import { MatDialog } from '@angular/material'
import { CookieSettingsComponent } from './components/cookie-settings/cookie-settings.component'
import { TcDialogComponent } from './components/tc-dialog/tc-dialog.component'

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
  languages = ['en', 'pt', 'de']

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
  }

  ngOnInit() {
    this.mainStore.dispatch(new TermsActions.TermsConditionsAttempt())

    this.translate.setDefaultLang('en')

    this.store
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.language$)
      )
      .subscribe(lang => {
        lang = !lang ? 'en' : lang
        this.translate.use(lang)
        this.selectedLang = lang
      })
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe()
    this.language$.unsubscribe()
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

  openTerms() {
    this.dialog.open(TcDialogComponent)
  }

  openCookies() {
    this.dialog.open(CookieSettingsComponent)
  }
}
