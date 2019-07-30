import { ManageBusinessData, TermsConditionsPostRequest, LocationData, BootstrapResponse, TermsAndConditions, BusinessData } from '@app/api/models/api-models'
import { Observable } from 'rxjs/Observable'

export abstract class IAuthorizationService {
  public abstract businessData(): Observable<BusinessData>

  public abstract manageBusiness(manageData: ManageBusinessData): Observable<any>

  public abstract requestAdminRights(locationData: LocationData): Observable<any>

  public abstract bootstrap(): Observable<BootstrapResponse>

  public abstract termsConditionsSave(acceptance: TermsConditionsPostRequest): Observable<TermsAndConditions>
}
