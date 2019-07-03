import { Observable } from 'rxjs'
import { BusinessData, LocationData, RequestAdminRightsBusinessId } from '../models/api-models'

export abstract class IReviewService {
  public abstract businessData(): Observable<BusinessData>

  public abstract requestAdminRights(locationData: LocationData): Observable<any>
  public abstract requestAdminRightsById(locationData: RequestAdminRightsBusinessId): Observable<any>

  public abstract oAuthTokens(business: RequestAdminRightsBusinessId): Observable<any>
}
