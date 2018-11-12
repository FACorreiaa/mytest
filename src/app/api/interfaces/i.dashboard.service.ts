import { Observable } from 'rxjs'
import { Data, ManageBusinessData } from '../models/api-models'

export abstract class IDashBoardService {
  public abstract businessData(): Observable<Data>

  public abstract editBusinessData(): Observable<any>

  public abstract removeBusinessData(): Observable<any>

  public abstract addBusinessData(manageData: ManageBusinessData): Observable<any>
}
