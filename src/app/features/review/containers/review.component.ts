import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'

import * as Actions from '../store/actions/review.actions'
import * as fromApp from '../../../app.reducers'
import * as fromReview from '../review.selector'

import { Subject, Observable } from 'rxjs'
import { delay, takeUntil } from 'rxjs/operators'

@Component({
    selector: 'review',
    templateUrl: 'review.component.html',
    styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>()
    oAuthTokenStatus$: Observable<boolean>
    redirectURL$: Observable<string>

    language: string
    listingStatus: boolean
    starRating: number

    constructor(
        private appStore: Store<fromApp.AppState>,
        private translate: TranslateService,
        private store: Store<fromReview.ReviewState>
    ) {
        this.oAuthTokenStatus$ = this.store.select(fromReview.getOauthTokenStatus)
        this.redirectURL$ = this.store.select(fromReview.redirectURL)
    }

    async ngOnInit() {
        this.translate.setDefaultLang('en')

        this.store.dispatch(new Actions.GetAllBusinessAction())

        this.appStore
            .pipe(
                delay(0),
                select(fromApp.language),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(lang => {
                this.language = lang
                this.translate.use(lang)
            })

        this.listingStatus = false

        this.starRating = 3
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
}
