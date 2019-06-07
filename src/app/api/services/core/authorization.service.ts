import { Injectable, Injector } from '@angular/core'
import { ManageBusinessData, TermsConditionsGetResponse, TermsConditionsPostRequest } from '../../models/api-models'
import { BaseApi } from '../base/baseapi'
import { IAuthorizationService } from '../../interfaces/i.authorization.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthorizationService extends BaseApi implements IAuthorizationService {
  private businessControllerRoute = 'businessUnit'
  private termsandconditionsControllerRoute = 'termsandconditions'

  constructor(injector: Injector) {
    super(injector)
  }

  public manageBusiness(manageData: ManageBusinessData): Observable<any> {
    return this.getObjectsPOST(manageData, `${this.businessControllerRoute}/manage?testMode=true`)
  }

  public termsConditions(): Observable<TermsConditionsGetResponse> {
    return this.getObjects(`${this.termsandconditionsControllerRoute}/`)
  }

  public termsConditionsSave(acceptance: TermsConditionsPostRequest): Observable<any> {
    return this.getObjectsPUT(acceptance, `${this.termsandconditionsControllerRoute}/`)
  }
}
