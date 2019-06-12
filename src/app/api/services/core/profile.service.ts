import { IProfileService } from '@app/api/interfaces/i.profile.service'
import { BaseApi } from '../base/baseapi'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { BusinessData } from '@app/api/models/api-models'

@Injectable()
export class ProfileService extends BaseApi implements IProfileService {
  private businessControllerRoute = 'businessUnit'

  constructor(injector: Injector) {
    super(injector)
  }

  public businessData(): Observable<BusinessData> {
    return this.getObjects(`${this.businessControllerRoute}/getAll?testMode=verification`)
  }

}
