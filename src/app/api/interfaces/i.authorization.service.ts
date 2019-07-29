import { ManageBusinessData, TermsConditionsPostRequest, LocationData, BootstrapResponse, TermsAndConditions } from '@app/api/models/api-models'
import { Observable } from 'rxjs/Observable'

export abstract class IAuthorizationService {
  public abstract manageBusiness(manageData: ManageBusinessData): Observable<any>

  public abstract requestAdminRights(locationData: LocationData): Observable<any>

  public abstract bootstrap(): Observable<BootstrapResponse>

  public abstract termsConditionsSave(acceptance: TermsConditionsPostRequest): Observable<TermsAndConditions>
}
