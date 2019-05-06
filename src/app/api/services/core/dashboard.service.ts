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

  // TODO - Pending services from POC version
  // public editBusinessData(manageData: ManageBusinessData): Observable<any> {
  //   return this.getObjectsPUT(manageData, `${this.businessControllerRoute}/manage/${manageData.data.id}`)
  // }

  // public removeBusinessData(deleteData: DeleteBusinessData): Observable<any> {
  //   return this.getObjectsDELETE(deleteData, `${this.businessControllerRoute}/manage/${deleteData.id}`)
  // }

  // public addBusinessData(manageData: ManageBusinessData): Observable<any> {
  //   return this.getObjectsPOST(manageData, `${this.businessControllerRoute}/manage`)
  // }
}
