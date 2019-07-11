import { Injectable, Injector } from '@angular/core'
import { IReviewService } from '@app/api/interfaces/i.reviews.service'
import { Observable } from 'rxjs'
import { BaseApi } from '../base/baseapi'
import { ReviewsResponse, UpdateReview, DeleteReview } from '@app/api/models/api-models'

@Injectable()
export class ReviewService extends BaseApi implements IReviewService {
  private reviewControllerRoute = 'businessUnit/review'

  constructor(injector: Injector) {
    super(injector)
  }

  public reviews(): Observable<ReviewsResponse> {
    throw new Error('Method not implemented.')
  }

  public updateReview(update: UpdateReview): Observable<any> {
    throw new Error('Method not implemented.')
  }

  public deleteReview(update: DeleteReview): Observable<any> {
    throw new Error('Method not implemented.')
  }
}
