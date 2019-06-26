import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AppRoutes as AuthRoutes } from '../app.routing'
import { KeycloakService } from 'keycloak-angular'
import { HeaderService } from '@app/api/services/core/header.service'
import { TranslateService } from '@ngx-translate/core'
import { Store, select } from '@ngrx/store'
import * as fromApp from '../app.reducers'
import { Subject } from 'rxjs/internal/Subject'
import * as AuthActions from '../auth/store/actions/auth.action'
import { delay, takeUntil } from 'rxjs/operators'

/**
 * The Authentication Component
 */
@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  private language$: Subject<void> = new Subject<void>()

  selectedLang: string
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
    this.language$.next()
    this.language$.complete()
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
