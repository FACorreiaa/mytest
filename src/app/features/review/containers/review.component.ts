import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'

import * as fromApp from '../../../app.reducers'

import { Subject } from 'rxjs'
import { delay, takeUntil } from 'rxjs/operators'

@Component({
    selector: 'review',
    templateUrl: 'review.component.html',
    styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>()

    language: string
    listingStatus: boolean

    constructor(
        private appStore: Store<fromApp.AppState>,
        private translate: TranslateService,
    ) { }

    async ngOnInit() {
        this.translate.setDefaultLang('en')

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
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
}
