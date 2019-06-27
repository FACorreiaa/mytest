import { Injectable, Injector } from '@angular/core'
import { ManageBusinessData, TermsConditionsGetResponse, TermsConditionsPostRequest, LocationData } from '../../models/api-models'
import { BaseApi } from '../base/baseapi'
import { IAuthorizationService } from '../../interfaces/i.authorization.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthorizationService extends BaseApi implements IAuthorizationService {
  private businessManageControllerRoute = 'businessUnit/manage'
  private businessRequestAdminControllerRoute = 'businessUnit/requestAdminRights'

  private termsandconditionsControllerRoute = 'termsandconditions'

  constructor(injector: Injector) {
    super(injector)
  }

  public manageBusiness(manageData: ManageBusinessData): Observable<any> {
    return this.getObjectsPOST(manageData, `${this.businessManageControllerRoute}?testMode=true`)
  }

  public requestAdminRights(locationData: LocationData): Observable<any> {
    return this.getObjectsPOST_Text(locationData, `${this.businessRequestAdminControllerRoute}?testMode=true`)
  }

  public termsConditions(): Observable<TermsConditionsGetResponse> {
    return this.getObjects(`${this.termsandconditionsControllerRoute}/`)
  }

  public termsConditionsSave(acceptance: TermsConditionsPostRequest): Observable<any> {
    return this.getObjectsPUT(acceptance, `${this.termsandconditionsControllerRoute}/`)
  }
}
