import { Observable } from 'rxjs'
import {
  BusinessData,
  ManageBusinessData,
  DeleteBusinessData,
  FetchVerificationResponse,
  BaseServiceResponse,
  FetchVerificationRequest,
  InitVerificationRequest,
  CompleteVerificationRequest,
} from '../models/api-models'

export abstract class IProfileService {
  public abstract businessData(): Observable<BusinessData>

  public abstract fetchVerificationOptions(id: number, obj: FetchVerificationRequest): Observable<any>

  public abstract initializeVerification(id: number, req: InitVerificationRequest): Observable<any>

  public abstract completeVerification(id: number, req: CompleteVerificationRequest): Observable<any>
}
