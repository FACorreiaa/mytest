import { Observable } from 'rxjs'
import {
  Data,
  ManageBusinessData,
  DeleteBusinessData,
  FetchVerificationResponse,
  BaseServiceResponse,
  FetchVerificationRequest,
  InitVerificationRequest,
  CompleteVerificationRequest,
} from '../models/api-models'

export abstract class IDashBoardService {
  public abstract businessData(): Observable<Data>

  public abstract fetchVerificationOptions(id: number, obj: FetchVerificationRequest): Observable<any>

  public abstract initializeVerification(id: number, req: InitVerificationRequest): Observable<any>

  public abstract completeVerification(id: number, req: CompleteVerificationRequest): Observable<any>
}
