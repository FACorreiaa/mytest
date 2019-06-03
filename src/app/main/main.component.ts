import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'

import * as fromApp from '../app.reducers'
import { AppRoutes as AuthRoutes } from '../app.routing'
import * as AuthActions from '../auth/store/actions/auth.action'

import { TranslateService } from '@ngx-translate/core'
import { delay, takeUntil } from 'rxjs/operators'
import { HeaderService } from '@app/api/services/core/header.service'
import { Router } from '@angular/router'
import { KeycloakService } from 'keycloak-angular'

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private language$: Subject<void> = new Subject<void>()
  private userSubscription$: Subject<void> = new Subject<void>()
  navbarOpen = false
  sideNavMode: 'side' | 'over' = 'side'
  loade = false
  loading$: Observable<boolean>
  selectedLanguage: string
  selectedLang: string
  userDetails: any
  token: any
  languages = ['en', 'pt', 'de']

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    public headerService: HeaderService
  ) {}

  ngOnInit() {
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

    // this.onLanguageSelect({ value: this.keycloakService.getKeycloakInstance().tokenParsed['locale'] })
  }

  public ngOnDestroy() {
    this.userSubscription$.unsubscribe()
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
}
