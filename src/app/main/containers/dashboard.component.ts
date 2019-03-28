import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'

import * as fromApp from '../../app.reducers'
import * as fromMain from '../main.reducers'
import * as Actions from '../store/actions/dashboard.actions'
import { Observable, Subject } from 'rxjs'
import { delay, takeUntil } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  business$: Observable<any[]>
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromMain.MainState>,
    private appStore: Store<fromApp.AppState>,
    private translate: TranslateService
  ) {
    this.business$ = this.store.select(fromMain.getBusiness)
  }

  ngOnInit(): void {
    //// ToDo: error in cors, temporarily
    // this.store.dispatch(new Actions.GetAllBusinessAction())

    this.appStore
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(lang => this.translate.use(lang))
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe()
  }

  editBusiness(obj: any) {
    this.router.navigate(['../business-detail/detail', obj.id], { relativeTo: this.route })
  }

  deleteBusiness(obj: any) {
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
