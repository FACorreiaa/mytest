import { Component, OnDestroy, OnInit } from '@angular/core'
import { AppRoutes as AuthRoutes } from './app.routing'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromApp from './app.reducers'
import * as AuthActions from './auth/store/actions/auth.action'
import { takeUntil, delay } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { KeycloakService } from 'keycloak-angular'
import { KeycloakProfile } from 'keycloak-js'
import { NgxPermissionsService } from 'ngx-permissions'
import { HttpClient, HttpHeaders } from '@angular/common/http'

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
  userDetails: any
  token: any
  languages = ['en', 'pt', 'de']
  headers: any

  constructor(
    // private http: HttpHeaders,
    private keycloakService: KeycloakService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService
  ) {}

  async ngOnInit() {
    this.translate.setDefaultLang('en')

    ////  ToDo - just to get examples from keycloak.
    // if (await this.keycloakService.isLoggedIn()) {
    // this.userDetails = await this.keycloakService.getUserRoles()
    // await this.keycloakService.getToken().then(value => (this.token = value))
    // console.log('this.userDetails', this.userDetails, this.token)
    // }

    this.store
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.userSubscription$)
      )
      .subscribe(lang => {
        this.translate.use(lang)
        this.selectedLang = lang
      })
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
