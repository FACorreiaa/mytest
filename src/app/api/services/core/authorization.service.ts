import { Inject, Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { UserLoginDto } from '../../models/api-models'
import { BaseApi } from '../base/baseapi'
import { IAuthorizationService } from '../../interfaces/i.authorization.service'

@Injectable()
export class AuthorizationService extends BaseApi implements IAuthorizationService {
  private controllerRoute = 'auth'
  constructor(injector: Injector) {
    super(injector)
  }

  /** Method to do the login.
   * @param credentials - The credentials for the user to login.
   */
  public login(credentials: UserLoginDto): Observable<any> {
    return this.getObjectsPOST(credentials, `${this.controllerRoute}/login`)
  }
}
