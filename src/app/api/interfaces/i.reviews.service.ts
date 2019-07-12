import { Observable } from 'rxjs'
import { ReviewsResponse, UpdateReview, DeleteReview } from '../models/api-models'

export abstract class IReviewService {
  public abstract reviews(): Observable<ReviewsResponse>

  public abstract updateReview(update: UpdateReview): Observable<any>

  public abstract deleteReview(update: DeleteReview): Observable<any>
}
