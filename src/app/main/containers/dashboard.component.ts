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

  editBusiness(obj: any) {
    this.router.navigate(['../business-detail/detail', obj.id], { relativeTo: this.route })
  }

  deleteBusiness(obj: any) {
    console.log(obj)

    const deleteObject = {
      id: obj.id,
      channels: [obj.channels[0].channel],
      data: {
        countryCode: obj.countryCode,
      },
    }
    this.store.dispatch(new Actions.DeleteBusinessAction(deleteObject))
  }
}
