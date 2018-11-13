import { Observable } from 'rxjs'
import { Data, ManageBusinessData, DeleteBusinessData } from '../models/api-models'

export abstract class IDashBoardService {
  public abstract businessData(): Observable<Data>

  public abstract editBusinessData(): Observable<any>

  public abstract removeBusinessData(deleteData: DeleteBusinessData): Observable<any>

  public abstract addBusinessData(manageData: ManageBusinessData): Observable<any>
}
