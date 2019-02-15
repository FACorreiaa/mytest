import { Component, OnDestroy, OnInit } from '@angular/core'
import { AppRoutes as AuthRoutes } from './app.routing'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromApp from './app.reducers'
import * as AuthActions from './auth/store/actions/auth.action'
import { takeUntil, delay } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'

/**
 * The app component.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private userSubscription$: Subject<void> = new Subject<void>()
  authorized: boolean
  selectedLanguage: string
  selectedLang: string
  languages = ['en', 'pt']

  constructor(private router: Router, private store: Store<fromApp.AppState>, private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en')

    this.store
      .pipe(
        delay(0),
        select(fromApp.userAuthorized),
        takeUntil(this.userSubscription$)
      )
      .subscribe(authorized => (this.authorized = authorized))

    this.store
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.userSubscription$)
      )
      .subscribe(lang => {
        // console.log('lang', lang)

        this.translate.use(lang)
        this.selectedLang = lang
      })
  }

  public ngOnDestroy() {
    this.userSubscription$.unsubscribe()
  }

  onLoginClick() {
    this.router.navigate([AuthRoutes.LOGIN])
  }

  onLogOutClick() {
    this.store.dispatch(new AuthActions.LogoutSuccess({}))
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new AuthActions.ChangeLanguage({ language }))
  }
}
