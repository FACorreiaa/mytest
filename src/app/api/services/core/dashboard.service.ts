import { IDashBoardService } from '@app/api/interfaces/i.dashboard.service'
import { BaseApi } from '../base/baseapi'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { Data, ManageBusinessData, DeleteBusinessData } from '@app/api/models/api-models'

@Injectable()
export class DashBoardService extends BaseApi implements IDashBoardService {
  private businessControllerRoute = 'businessUnit'

  constructor(injector: Injector) {
    super(injector)
  }

  public businessData(): Observable<Data> {
    return this.getObjects(`${this.businessControllerRoute}/getAll`)
  }

  public editBusinessData(): Observable<any> {
    // Temporary- just for development reasons
    return Observable.create(observer => {
      observer.next({ success: 'true' })
      observer.complete()
    })
  }

  // TODO - Fix parameter type
  public removeBusinessData(deleteData: any): Observable<any> {
    return this.getObjectsDELETE(deleteData.payload, `${this.businessControllerRoute}/manage/${deleteData.payload.id}`)
    // Temporary- just for development reasons
    /* return Observable.create(observer => {
      observer.next({ success: 'true' })
      observer.complete()
    }) */
  }

  public addBusinessData(manageData: ManageBusinessData): Observable<any> {
    return this.getObjectsPOST(manageData, `${this.businessControllerRoute}/manage`)

    // Temporary- just for development reasons
    // return Observable.create(observer => {
    //   observer.next({ success: 'true' })
    //   observer.complete()
    // })
  }
}
