import { IDashBoardService } from '@app/api/interfaces/i.dashboard.service'
import { BaseApi } from '../base/baseapi'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import {
  BusinessData,
  FetchVerificationResponse,
  BaseServiceResponse,
  FetchVerificationRequest,
  InitVerificationRequest,
  CompleteVerificationRequest,
  LocationData,
  RequestAdminRightsBusinessId,
} from '@app/api/models/api-models'

@Injectable()
export class DashBoardService extends BaseApi implements IDashBoardService {
  private businessControllerRoute = 'businessUnit'
  private businessVerificationControllerRoute = 'businessUnit/verification'
  private businessRequestAdminControllerRoute = 'businessUnit/requestAdminRights'

  constructor(injector: Injector) {
    super(injector)
  }

  public businessData(): Observable<BusinessData> {
    return this.getObjects(`${this.businessControllerRoute}/getAll`)
  }

  public requestAdminRights(locationData: LocationData): Observable<any> {
    return this.getObjectsPOST_Text(locationData, `${this.businessRequestAdminControllerRoute}`)
  }

  public requestAdminRightsById(locationData: RequestAdminRightsBusinessId): Observable<any> {
    return this.getObjectsPOST_Text(locationData, `${this.businessRequestAdminControllerRoute}`)
  }

  public oAuthTokens(business: RequestAdminRightsBusinessId): Observable<any> {
    return this.getObjectsPOST_Text(business, `${this.businessRequestAdminControllerRoute}/oAuth`)
  }
  public fetchVerificationOptions(id: number, req: FetchVerificationRequest): Observable<any> {
    return this.getObjectsPOST(req, `${this.businessVerificationControllerRoute}/${id}/fetchOptions`)
  }

  public initializeVerification(id: number, req: InitVerificationRequest): Observable<any> {
    return this.getObjectsPOST_Text(req, `${this.businessVerificationControllerRoute}/${id}/init`)
  }

  public completeVerification(id: number, req: CompleteVerificationRequest): Observable<any> {
    return this.getObjectsPOST_Text(req, `${this.businessVerificationControllerRoute}/${id}/complete`)
  }
}
