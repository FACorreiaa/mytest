import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'

import * as Actions from '../store/actions/dashboard.actions'
import * as fromDashboard from '../dashboard.selector'
import * as fromApp from '../../../app.reducers'
import { Role } from '@app/api/models/api-models'

import { Subject, Observable } from 'rxjs'
import { delay, takeUntil } from 'rxjs/operators'
import { KeycloakService } from 'keycloak-angular'
import {
  FetchVerificationRequest,
  InitVerificationRequest,
  CompleteVerificationRequest,
  BusinessData,
  FetchVerificationResponse,
  InitVerificationEvent,
  CompleteVerificationEvent,
} from '@app/api/models/api-models'

@Component({
  selector: 'dashboard-feature',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  businessList$: Observable<BusinessData[]>
  oAuthTokenStatus$: Observable<boolean>
  redirectURL$: Observable<string>
  language: string

  fecthOptions$: Observable<FetchVerificationResponse>
  userName: string
  userFirstLastName: string
  percentageToComplete: string
  averageService: string
  services: string[] = ['All', 'Google', 'Other']
  currentRate = 4
  listingStatus: boolean
  myRole: Role
  Role = Role

  constructor(
    private appStore: Store<fromApp.AppState>,
    private store: Store<fromDashboard.DashBoardState>,
    private translate: TranslateService,
    protected keycloakService: KeycloakService
  ) {
    this.businessList$ = this.store.select(fromDashboard.getDashBoardBusinessList)
    this.fecthOptions$ = this.store.select(fromDashboard.getfecthVerificationOptions)
    this.oAuthTokenStatus$ = this.store.select(fromDashboard.getOauthTokenStatus)
    this.redirectURL$ = this.store.select(fromDashboard.redirectURL)
    this.myRole = Role.admin
  }

  async ngOnInit() {
    // this.translate.setDefaultLang('en')
    this.translate.setDefaultLang('en')
    this.translate.addLangs(['en', 'fr', 'de', 'pt'])
    const browserLang = this.translate.getBrowserLang()
    this.translate.use(browserLang.match(/en|fr|de|pt/) ? browserLang : 'en')

    this.appStore
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(lang => {
        this.language = lang
        this.translate.use(lang)
      })

    this.store.dispatch(new Actions.GetAllBusinessAction())
    const userProfile = await this.keycloakService.loadUserProfile(false)

    this.userName = userProfile.firstName
    this.userFirstLastName = userProfile.firstName + ' ' + userProfile.lastName

    this.percentageToComplete = '60%'

    this.listingStatus = false
  }

  setStatus() {
    this.listingStatus = this.listingStatus = !this.listingStatus
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  updateDashboard() {
    this.store.dispatch(new Actions.GetAllBusinessAction())
  }

  async fetchOptions(businessId: number) {
    await this.fetchAllVerificationOptions(businessId)
  }

  private fetchAllVerificationOptions(id: number) {
    this.store.dispatch(
      new Actions.FetchVerificationOptions(id, {
        languageCode: 'de',
      } as FetchVerificationRequest)
    )
  }

  async initializeOption(optionEvent: InitVerificationEvent) {
    await this.initVerificationOptions(optionEvent)
  }

  private initVerificationOptions(optionEvent: InitVerificationEvent) {
    this.store.dispatch(new Actions.InitVerification(optionEvent.id, optionEvent.request))
  }

  completeVerification(completeReq: CompleteVerificationEvent) {
    const req: CompleteVerificationRequest = {
      pin: completeReq.request.pin,
    }

    this.store.dispatch(new Actions.CompleteVerification(completeReq.id, req))
  }
}
