import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import * as fromMain from '../../../main/main.selectors'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { BusinessData } from '@app/api/models/api-models'

@Component({
  selector: 'google-comp',
  templateUrl: 'google.container.html',
  styleUrls: ['./google.container.scss'],
})
export class GoogleComponent implements OnInit {
  firstStep: boolean
  secondStep: boolean
  businessData$: Observable<BusinessData[]>

  constructor(private translate: TranslateService, private mainStore: Store<fromMain.MainState>) {
    this.businessData$ = this.mainStore.select(fromMain.getDashboardState)
  }

  ngOnInit() {
    this.translate.setDefaultLang('en')
    this.firstStep = true
  }

  continue() {
    this.firstStep = false
    this.secondStep = true
  }
}
