import { Observable } from 'rxjs'

export abstract class IDashBoardService {
  public abstract businessData(): Observable<any>
}
