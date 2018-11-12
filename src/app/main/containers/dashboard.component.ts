import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
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

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromMain.MainState>, private appStore: Store<fromModule.AppState>) {
    this.business$ = this.store.select(fromMain.getBusiness)
  }

  ngOnInit(): void {
    this.store.dispatch(new Actions.GetAllBusinessAction())
  }

  editBusiness(objId: any) {
    this.router.navigate(['../business-detail/detail', objId], { relativeTo: this.route })
  }

  deleteBusiness(objId: any) {
    console.log('deleteBusiness container')
  }
}
