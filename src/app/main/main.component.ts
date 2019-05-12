import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'

import * as fromModule from '../app.reducers'
// import * as fromMainModule from '../main/main.reducers'
import { TranslateService } from '@ngx-translate/core'
import { delay, takeUntil } from 'rxjs/operators'
import { HeaderService } from '@app/api/services/core/header.service'

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  private language$: Subject<void> = new Subject<void>()
  navbarOpen = false
  sideNavMode: 'side' | 'over' = 'side'
  loade = false
  loading$: Observable<boolean>

  constructor(private storeApp: Store<fromModule.AppState>, private readonly translate: TranslateService, public headerService: HeaderService) {
    // this.loading$ = this.storeMain.select(fromMainModule.getLoading)
  }

  ngOnInit() {
    this.translate.setDefaultLang('en')

    this.storeApp
      .pipe(
        delay(0),
        select(fromModule.language),
        takeUntil(this.language$)
      )
      .subscribe(lang => this.translate.use(lang))
  }
}
