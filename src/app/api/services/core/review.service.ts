import { IReviewService } from '@app/api/interfaces/i.review.service'
import { BaseApi } from '../base/baseapi'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { BusinessData, LocationData, RequestAdminRightsBusinessId } from '@app/api/models/api-models'

@Injectable()
export class ReviewService extends BaseApi implements IReviewService {
  private businessControllerRoute = 'businessUnit'
  private businessRequestAdminControllerRoute = 'businessUnit/requestAdminRights'

  constructor(injector: Injector) {
    super(injector)
  }

  public businessData(): Observable<BusinessData> {
    return this.getObjects(`${this.businessControllerRoute}/getAll`)
  }

  public requestAdminRights(locationData: LocationData): Observable<any> {
    return this.getObjectsPOST_Text(locationData, `${this.businessRequestAdminControllerRoute}`)
  }

  public requestAdminRightsById(locationData: RequestAdminRightsBusinessId): Observable<any> {
    return this.getObjectsPOST_Text(locationData, `${this.businessRequestAdminControllerRoute}`)
  }

  public oAuthTokens(business: RequestAdminRightsBusinessId): Observable<any> {
    return this.getObjectsPOST_Text(business, `${this.businessRequestAdminControllerRoute}/oAuth`)
  }

}
