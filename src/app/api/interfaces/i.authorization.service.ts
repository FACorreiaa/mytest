import { ManageBusinessData, TermsConditionsGetResponse, TermsConditionsPostRequest, LocationData } from '@app/api/models/api-models'
import { Observable } from 'rxjs/Observable'

export abstract class IAuthorizationService {
  public abstract manageBusiness(manageData: ManageBusinessData): Observable<any>

  public abstract requestAdminRights(locationData: LocationData): Observable<any>

  public abstract termsConditions(): Observable<TermsConditionsGetResponse>

  public abstract termsConditionsSave(acceptance: TermsConditionsPostRequest): Observable<TermsConditionsGetResponse>
}
