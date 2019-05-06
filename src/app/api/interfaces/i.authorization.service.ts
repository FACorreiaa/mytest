import { Observable } from 'rxjs'
import { ManageBusinessData } from '@app/api/models/api-models'

export abstract class IAuthorizationService {
  public abstract manageBusiness(manageData: ManageBusinessData): Observable<any>
}
