import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { FormGroup, FormBuilder } from '@angular/forms'

import * as fromApp from '../../../../app.reducers'

import { Subject, Observable } from 'rxjs'
import { delay, takeUntil } from 'rxjs/operators'

import { ReviewsResponse, UpdateReview, DeleteReview } from '@app/api/models/api-models'

@Component({
  selector: 'review-comment',
  templateUrl: 'review-comment.component.html',
  styleUrls: ['./review-comment.component.scss'],
})
export class ReviewCommentComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  oAuthTokenStatus$: Observable<boolean>
  redirectURL$: Observable<string>
  replyFormGroup: FormGroup

  language: string
  listingStatus: boolean

  /* Mock data */
  comment: string
  replyComment: string
  doneCommenting: boolean
  timestamp: Date
  updateTime: string
  editMode: boolean

  @Input() reviews: ReviewsResponse
  @Output() done: EventEmitter<any> = new EventEmitter()
  @Output() updateReviewEvent: EventEmitter<any> = new EventEmitter()
  @Output() deleteReviewEvent: EventEmitter<any> = new EventEmitter()

  constructor(private appStore: Store<fromApp.AppState>, private translate: TranslateService, private formBuilder: FormBuilder) {}

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
    this.replyComment = ''
    this.doneCommenting = false

    this.replyFormGroup = this.formBuilder.group({
      replyComment: this.replyComment,
    })
  }

  onCancel() {
    this.done.emit('cancel')
  }

  onSubmit() {
    this.replyComment = this.replyFormGroup.get('replyComment').value
    // add submit code here
  }

  activateEdit() {
    this.editMode = true
  }

  updateReview() {
    const update: UpdateReview = { comment: 'some comment', establishmentId: '1', reviewId: '1' }
    this.updateReviewEvent.emit(update)
    // it takes to much time to generate the new date, maybe there is a faster way to do that
    this.updateTime = new Date().toISOString()
    this.editMode = false
  }

  deleteReview() {
    const update: DeleteReview = { establishmentId: '1', reviewId: '1' }
    this.deleteReviewEvent.emit(update)
    this.editMode = false
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
