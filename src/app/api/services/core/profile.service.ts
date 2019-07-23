import { IProfileService } from '@app/api/interfaces/i.profile.service'
import { BaseApi } from '../base/baseapi'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { BusinessData, BaseServiceResponse, ManageBusinessData, UpdateBusinessData } from '@app/api/models/api-models'

@Injectable()
export class ProfileService extends BaseApi implements IProfileService {
  private businessControllerRoute = 'businessUnit'

  constructor(injector: Injector) {
    super(injector)
  }

  public businessData(): Observable<BusinessData> {
    return this.getObjects(`${this.businessControllerRoute}/getAll`)
  }

  public updateBusinessData(business: UpdateBusinessData): Observable<BaseServiceResponse<any>> {
    return this.getObjectsPUT(business.businessUnit, `${this.businessControllerRoute}/manage/`)
  }
}
