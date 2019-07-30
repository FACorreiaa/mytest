import { Injectable, Injector } from '@angular/core'
import { ManageBusinessData, TermsConditionsPostRequest, LocationData, BootstrapResponse, BusinessData } from '../../models/api-models'
import { BaseApi } from '../base/baseapi'
import { IAuthorizationService } from '../../interfaces/i.authorization.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthorizationService extends BaseApi implements IAuthorizationService {
  private businessControllerRoute = 'businessUnit'

  private businessManageControllerRoute = 'businessUnit/manage'
  private businessRequestAdminControllerRoute = 'businessUnit/requestAdminRights'

  private termsandconditionsControllerRoute = 'termsandconditions'
  private bootstrapControllerRoute = 'bootstrap'

  constructor(injector: Injector) {
    super(injector)
  }

  public businessData(): Observable<BusinessData> {
    return this.getObjects(`${this.businessControllerRoute}/getAll`)
  }

  public manageBusiness(manageData: ManageBusinessData): Observable<any> {
    return this.getObjectsPOST(manageData, `${this.businessManageControllerRoute}`)
  }

  public requestAdminRights(locationData: LocationData): Observable<any> {
    locationData.channel = locationData.businessUnit.channels[0]
    return this.getObjectsPOST_Text(locationData, `${this.businessRequestAdminControllerRoute}`)
  }

  public bootstrap(): Observable<BootstrapResponse> {
    return this.getObjects(`${this.bootstrapControllerRoute}/`)
  }

  public termsConditionsSave(acceptance: TermsConditionsPostRequest): Observable<any> {
    return this.getObjectsPUT(acceptance, `${this.termsandconditionsControllerRoute}/`)
  }
}
