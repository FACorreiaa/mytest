import { Observable } from 'rxjs'
import { Data } from '../models/api-models'

export abstract class IDashBoardService {
  public abstract businessData(): Observable<Data>

  public abstract editBusinessData(): Observable<any>
}
