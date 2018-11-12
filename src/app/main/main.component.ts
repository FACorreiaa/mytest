import { Component, OnInit } from '@angular/core'
import { ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as fromModule from '../app.reducers'
import * as fromMainModule from '../main/main.reducers'

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  sideNavOpened = true
  sideNavMode: 'side' | 'over' = 'side'
  private user$: Observable<any>
  loade = false
  loading$: Observable<boolean>

  constructor(private storeApp: Store<fromModule.AppState>, private storeMain: Store<fromMainModule.MainState>) {
    this.user$ = this.storeApp.select(fromModule.getLoggedUser)
    this.loading$ = this.storeMain.select(fromMainModule.getLoading)
  }

  ngOnInit() {}
}
