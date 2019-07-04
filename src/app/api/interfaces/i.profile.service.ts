import { Observable } from 'rxjs'
import { BusinessData, BaseServiceResponse, ManageBusinessData, UpdateBusinessData } from '../models/api-models'

export abstract class IProfileService {
  public abstract businessData(): Observable<BusinessData>

  public abstract updateBusinessData(business: UpdateBusinessData): Observable<BaseServiceResponse<any>>
}
