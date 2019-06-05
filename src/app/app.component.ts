import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { delay, takeUntil } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'

import * as fromApp from './app.reducers'
import { Subject } from 'rxjs'
import * as AuthActions from './auth/store/actions/auth.action'

/**
 * The app component.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private language$: Subject<void> = new Subject<void>()
  selectedLang: string

  constructor(private store: Store<fromApp.AppState>, private translate: TranslateService) {}

  ngOnInit() {
    this.translate.setDefaultLang('en')

    this.store
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.language$)
      )
      .subscribe(lang => {
        lang = !lang ? 'en' : lang
        this.translate.use(lang)
        this.selectedLang = lang
      })
  }
}
