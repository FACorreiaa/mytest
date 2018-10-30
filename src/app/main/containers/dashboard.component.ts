import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'

import * as fromModule from '../../app.reducers'
import * as fromMain from '../main.reducers'
import * as Actions from '../store/actions/dashboard.actions'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  business$: Observable<any[]>

  constructor(private router: Router, private store: Store<fromMain.MainState>, private appStore: Store<fromModule.AppState>) {
    this.store.dispatch(new Actions.GetAllBusinessAction())
  }

  ngOnInit(): void {
    this.business$ = this.store.select(fromMain.getBusiness)
  }
}
