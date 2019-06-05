import { ManageBusinessData, TermsConditionsGetResponse, TermsConditionsPostRequest } from '@app/api/models/api-models'
import { Observable } from 'rxjs/Observable'

export abstract class IAuthorizationService {
  public abstract manageBusiness(manageData: ManageBusinessData): Observable<any>

  public abstract termsConditions(): Observable<TermsConditionsGetResponse>

  public abstract termsConditionsSave(acceptance: TermsConditionsPostRequest): Observable<TermsConditionsGetResponse>
}
