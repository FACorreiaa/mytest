import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap'

import * as fromApp from '../../../../app.reducers'

import { Subject, Observable } from 'rxjs'
import { delay, takeUntil } from 'rxjs/operators'

import { ReviewsResponse } from '@app/api/models/api-models'

@Component({
  selector: 'review-listing',
  templateUrl: 'review-listing.component.html',
  styleUrls: ['./review-listing.component.scss'],
  providers: [NgbRatingConfig],
})
export class ReviewListingComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  oAuthTokenStatus$: Observable<boolean>
  redirectURL$: Observable<string>

  language: string
  listingStatus: boolean

  /* Mock data */
  starRating: number
  displayName: string
  isAnonymous: boolean
  comment: string
  createTime: string
  showReplyButton: boolean
  replyComment: string

  @Input() reviews: ReviewsResponse
  @Output() updateReviewEvent: EventEmitter<any> = new EventEmitter()
  @Output() deleteReviewEvent: EventEmitter<any> = new EventEmitter()

  constructor(private appStore: Store<fromApp.AppState>, private translate: TranslateService, private config: NgbRatingConfig) {
    this.config.max = 5
    this.config.readonly = true
  }

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

    /* Mock data */
    this.starRating = 3
    this.isAnonymous = true
    this.showReplyButton = true
    this.displayName = 'TestUser'
    this.comment = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
    this.createTime = '2018-09-11T15:03:12.890902Z'
    this.replyComment = ''
  }

  onReplyButtonClick() {
    this.showReplyButton = false
  }

  onReviewCommentDone(event: string) {
    this.showReplyButton = true
    console.log(event)
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
