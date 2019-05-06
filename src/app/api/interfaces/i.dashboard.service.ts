import { Observable } from 'rxjs'
import { Data, ManageBusinessData, DeleteBusinessData } from '../models/api-models'

export abstract class IDashBoardService {
  public abstract businessData(): Observable<Data>

  // TODO - Pending services from POC version
  // public abstract editBusinessData(manageData: ManageBusinessData): Observable<any>

  // public abstract removeBusinessData(deleteData: DeleteBusinessData): Observable<any>

  // public abstract addBusinessData(manageData: ManageBusinessData): Observable<any>
}
