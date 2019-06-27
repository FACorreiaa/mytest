import { Component, OnInit, OnDestroy } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Store } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'

import { BusinessData } from '@app/api/models/api-models'
import * as Actions from '../store/google.actions'
import * as fromDirectories from '../../directories.selector'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'finish-comp',
  templateUrl: 'finish.container.html',
  styleUrls: ['./finish.container.scss'],
})
export class FinishComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()

  businessData$: Observable<BusinessData[]>
  oAuthTokenStatus$: Observable<boolean>
  redirectURL$: Observable<string>
  loading$: Observable<boolean>
  hasError: boolean

  constructor(private route: ActivatedRoute, private router: Router, private translate: TranslateService, private directoryStore: Store<fromDirectories.DirectoriesState>) {
    this.businessData$ = this.directoryStore.select(fromDirectories.getBusinessState)
    this.oAuthTokenStatus$ = this.directoryStore.select(fromDirectories.getOauthTokenStatus)
    this.redirectURL$ = this.directoryStore.select(fromDirectories.getRedirectURL)
    this.loading$ = this.directoryStore.select(fromDirectories.getLoading)
  }

  ngOnInit() {
    this.translate.setDefaultLang('en')
    this.hasError = false

    if (this.route.snapshot.queryParams['error']) {
      this.hasError = true
    }

    if (this.route.snapshot.queryParams['lang']) {
      this.translate.use(this.route.snapshot.queryParams['lang'])
    }

    this.directoryStore.dispatch(new Actions.GetAllBusinessAction())
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
