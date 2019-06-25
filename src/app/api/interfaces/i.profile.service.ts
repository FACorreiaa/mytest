import { Observable } from 'rxjs'
import { BusinessData } from '../models/api-models'

export abstract class IProfileService {
  public abstract businessData(): Observable<BusinessData>
}
