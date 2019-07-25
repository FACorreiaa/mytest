import { Observable } from 'rxjs'
import { BusinessUnitCompleteness } from '../models/api-models'

export abstract class IProfileCompletenessService {
  public abstract getAllCompleteness(): Observable<BusinessUnitCompleteness>
  public abstract businessUnitCompleteness(establishmentId: string): Observable<BusinessUnitCompleteness>
}
