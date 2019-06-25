import { Component, OnInit, OnChanges, HostListener, OnDestroy } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as Actions from '../store/google.actions'
import * as fromDirectories from '../../directories.selector'

import { BusinessData } from '@app/api/models/api-models'

@Component({
  selector: 'google-comp',
  templateUrl: 'google.container.html',
  styleUrls: ['./google.container.scss'],
})
export class GoogleComponent implements OnInit {
  businessData$: Observable<BusinessData[]>
  oAuthTokenStatus$: Observable<boolean>
  redirectURL$: Observable<string>
  loading$: Observable<boolean>

  constructor(private translate: TranslateService, private directoryStore: Store<fromDirectories.DirectoriesState>) {
    this.businessData$ = this.directoryStore.select(fromDirectories.getBusinessState)
    this.oAuthTokenStatus$ = this.directoryStore.select(fromDirectories.getOauthTokenStatus)
    this.redirectURL$ = this.directoryStore.select(fromDirectories.getRedirectURL)
    this.loading$ = this.directoryStore.select(fromDirectories.getLoading)

    window.focus = function() {
      alert('focuss')
    }
  }

  ngOnInit() {
    this.translate.setDefaultLang('en')
    this.directoryStore.dispatch(new Actions.GetAllBusinessAction())
  }

  @HostListener('window:focus', ['$event'])
  onFocus(event: any): void {
    alert('focuss')
  }
}
