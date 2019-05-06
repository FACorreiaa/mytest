import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'

import * as Actions from '../store/actions/dashboard.actions'
import * as fromDashboard from '../dashboard.reducer'
import * as fromApp from '../../../app.reducers'

import { Subject } from 'rxjs'
import { delay, takeUntil } from 'rxjs/operators'
import { KeycloakService } from 'keycloak-angular'

@Component({
  selector: 'dashboard-feature',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  userName: string
  percentageToComplete: string
  averageService: string
  services: string[] = ['All', 'Google', 'Other']
  currentRate = 4

  constructor(
    private appStore: Store<fromApp.AppState>,
    private store: Store<fromDashboard.DashBoardState>,
    private translate: TranslateService,
    protected keycloakService: KeycloakService
  ) {}

  async ngOnInit() {
    this.translate.setDefaultLang('en')
    this.store.dispatch(new Actions.GetAllBusinessAction())

    const userProfile = await this.keycloakService.loadUserProfile(false)
    this.userName = userProfile.firstName
    this.percentageToComplete = '35%'

    this.appStore
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(lang => this.translate.use(lang))
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe()
  }
}
