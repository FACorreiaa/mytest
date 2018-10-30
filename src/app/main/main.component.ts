import { Component, OnInit } from '@angular/core'
import { ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as fromModule from '../app.reducers'

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

  constructor(private storeApp: Store<fromModule.AppState>) {
    this.user$ = this.storeApp.select(fromModule.getLoggedUser)
  }

  ngOnInit() {}
}
