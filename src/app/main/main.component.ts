import { Component, OnInit } from '@angular/core'
import { ChangeDetectionStrategy } from '@angular/core'

import { AppRoutes } from '../app.routing'
import * as fromModule from '../app.reducers'
import * as AuthAction from '../auth/store/actions/auth.action'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  private user$: Observable<any>

  constructor(private storeApp: Store<fromModule.AppState>) {
    this.user$ = this.storeApp.select(fromModule.getLoggedUser)
  }

  ngOnInit() {}
}
