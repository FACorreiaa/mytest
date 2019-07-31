import { IProfileCompletenessService } from '@app/api/interfaces/i.profile-completeness.service'
import { BaseApi } from '../base/baseapi'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { BusinessUnitCompleteness } from '@app/api/models/api-models'

@Injectable()
export class ProfileCompletenessService extends BaseApi implements IProfileCompletenessService {
  private businessControllerRoute = 'businessUnit'

  constructor(injector: Injector) {
    super(injector)
  }

  public getAllCompleteness(): Observable<BusinessUnitCompleteness> {
    return this.getObjects(`${this.businessControllerRoute}/getAll/completeness`)
  }

  public businessUnitCompleteness(establishmentId: string): Observable<BusinessUnitCompleteness> {
    return this.getObjects(`${this.businessControllerRoute}/getAll/completeness/${establishmentId}`)
  }
}
