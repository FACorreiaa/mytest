import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { BusinessData } from '@app/api/models/api-models'
import * as Actions from '../store/google.actions'
import * as fromDirectories from '../../directories.selector'

@Component({
  selector: 'finish-comp',
  templateUrl: 'finish.container.html',
  styleUrls: ['./finish.container.scss'],
})
export class FinishComponent implements OnInit {
  businessData$: Observable<BusinessData[]>
  oAuthTokenStatus$: Observable<boolean>
  redirectURL$: Observable<string>
  loading$: Observable<boolean>

  constructor(private translate: TranslateService, private directoryStore: Store<fromDirectories.DirectoriesState>) {
    this.businessData$ = this.directoryStore.select(fromDirectories.getBusinessState)
    this.oAuthTokenStatus$ = this.directoryStore.select(fromDirectories.getOauthTokenStatus)
    this.redirectURL$ = this.directoryStore.select(fromDirectories.getRedirectURL)
    this.loading$ = this.directoryStore.select(fromDirectories.getLoading)
  }

  ngOnInit() {
    this.translate.setDefaultLang('en')
    this.directoryStore.dispatch(new Actions.GetAllBusinessAction())
  }
}
