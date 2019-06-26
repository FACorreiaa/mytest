import { Component, OnInit, OnChanges, HostListener, OnDestroy } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Store, select } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'

import * as Actions from '../store/google.actions'
import * as fromDirectories from '../../directories.selector'
import * as fromApp from '../../../app.reducers'

import { BusinessData } from '@app/api/models/api-models'
import { delay, takeUntil } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'google-comp',
  templateUrl: 'google.container.html',
  styleUrls: ['./google.container.scss'],
})
export class GoogleComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()

  businessData$: Observable<BusinessData[]>
  oAuthTokenStatus$: Observable<boolean>
  redirectURL$: Observable<string>
  loading$: Observable<boolean>

  constructor(
    private appStore: Store<fromApp.AppState>,
    private translate: TranslateService,
    private directoryStore: Store<fromDirectories.DirectoriesState>,
    private route: ActivatedRoute
  ) {
    this.businessData$ = this.directoryStore.select(fromDirectories.getBusinessState)
    this.oAuthTokenStatus$ = this.directoryStore.select(fromDirectories.getOauthTokenStatus)
    this.redirectURL$ = this.directoryStore.select(fromDirectories.getRedirectURL)
    this.loading$ = this.directoryStore.select(fromDirectories.getLoading)
  }

  ngOnInit() {
    this.translate.setDefaultLang('en')

    this.appStore
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(lang => this.translate.use(this.route.snapshot.queryParams['lang']))

    this.directoryStore.dispatch(new Actions.GetAllBusinessAction())
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
