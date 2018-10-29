import { Inject, Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { UserLoginDto, ManageBusinessData } from '../../models/api-models'
import { BaseApi } from '../base/baseapi'
import { IAuthorizationService } from '../../interfaces/i.authorization.service'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class AuthorizationService extends BaseApi implements IAuthorizationService {
  private controllerRoute = 'user'
  private businessControllerRoute = 'businessUnit'

  constructor(injector: Injector) {
    super(injector)
  }
  s
  /** Method to do the login.
   * @param credentials - The credentials for the user to login.
   */
  public login(credentials: UserLoginDto): Observable<any> {
    return this.getObjectsPOST(credentials, `${this.controllerRoute}/login`)
  }

  /** Method to do the registration.
   * @param credentials - The credentials for the user to register.
   */
  public register(credentials: UserLoginDto): Observable<any> {
    // Temporary- just for development reasons
    return Observable.create(observer => {
      observer.next({ email: 'testing@cocus.com', password: '12345678' })
      observer.complete()
    })
    // return this.getObjectsPOST(credentials, `${this.controllerRoute}/register`)
  }

  public manageBusiness(manageData: ManageBusinessData): Observable<any> {
    return this.getObjectsPOST(manageData, `${this.businessControllerRoute}/manage`)
  }
}
