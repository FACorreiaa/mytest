import { Observable } from 'rxjs'
import { BusinessData, FetchVerificationRequest, InitVerificationRequest, CompleteVerificationRequest, LocationData, RequestAdminRightsBusinessId } from '../models/api-models'

export abstract class IDashBoardService {
  public abstract businessData(): Observable<BusinessData>

  public abstract requestAdminRights(locationData: LocationData): Observable<any>

  public abstract requestAdminRightsById(locationData: RequestAdminRightsBusinessId): Observable<any>

  public abstract oAuthTokens(business: RequestAdminRightsBusinessId): Observable<any>

  public abstract fetchVerificationOptions(id: number, obj: FetchVerificationRequest): Observable<any>

  public abstract initializeVerification(id: number, req: InitVerificationRequest): Observable<any>

  public abstract completeVerification(id: number, req: CompleteVerificationRequest): Observable<any>
}
