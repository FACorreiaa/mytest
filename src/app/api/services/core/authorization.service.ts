import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { ManageBusinessData } from '../../models/api-models'
import { BaseApi } from '../base/baseapi'
import { IAuthorizationService } from '../../interfaces/i.authorization.service'

@Injectable()
export class AuthorizationService extends BaseApi implements IAuthorizationService {
  private businessControllerRoute = 'businessUnit'

  constructor(injector: Injector) {
    super(injector)
  }

  public manageBusiness(manageData: ManageBusinessData): Observable<any> {
    return this.getObjectsPOST(manageData, `${this.businessControllerRoute}/manage`)
  }
}
