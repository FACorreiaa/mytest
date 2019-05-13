import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'

import * as Actions from '../store/actions/dashboard.actions'
import * as fromDashboard from '../dashboard.reducer'
import * as fromApp from '../../../app.reducers'

import { Subject, Observable } from 'rxjs'
import { delay, takeUntil } from 'rxjs/operators'
import { KeycloakService } from 'keycloak-angular'
import { FetchVerificationRequest, Data, InitVerificationRequest, CompleteVerificationRequest } from '@app/api/models/api-models'

@Component({
  selector: 'dashboard-feature',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  businessList$: Observable<Data[]>
  userName: string
  percentageToComplete: string
  averageService: string
  services: string[] = ['All', 'Google', 'Other']
  currentRate = 4
  listingStatus: boolean

  constructor(
    private appStore: Store<fromApp.AppState>,
    private store: Store<fromDashboard.DashBoardState>,
    private translate: TranslateService,
    protected keycloakService: KeycloakService
  ) {
    this.businessList$ = this.store.select(fromDashboard.getDashBoardBusinessList)
  }

  async ngOnInit() {
    this.translate.setDefaultLang('en')
    // this.store.dispatch(new Actions.GetAllBusinessAction())

    // TODO : example to show in sprint review - CS-676
    await this.fetchAllVerificationOptions(315)
    await this.initVerificationOptions(315)
    await this.completeVerification(315)

    const userProfile = await this.keycloakService.loadUserProfile(false)

    this.userName = userProfile.firstName
    this.percentageToComplete = '60%'

    this.appStore
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(lang => this.translate.use(lang))

    this.listingStatus = false
  }

  setStatus() {
    this.listingStatus = this.listingStatus = !this.listingStatus
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe()
  }

  fetchAllVerificationOptions(id: number) {
    const req: FetchVerificationRequest = {
      languageCode: 'de',
    }

    this.store.dispatch(new Actions.FetchVerificationOptions(id, req))
  }

  initVerificationOptions(id: number) {
    const req: InitVerificationRequest = {
      input: { emailAddress: 'use@this.com' },
      method: 'EMAIL',
      languageCode: 'de',
    }

    this.store.dispatch(new Actions.InitVerification(id, req))
  }

  completeVerification(id: number) {
    const req: CompleteVerificationRequest = {
      pin: '3443',
    }

    this.store.dispatch(new Actions.CompleteVerification(id, req))
  }
}
