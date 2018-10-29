import { Observable } from 'rxjs'
import { UserLoginDto, ManageBusinessData } from '@app/api/models/api-models'

export abstract class IAuthorizationService {
  public abstract login(credentials: UserLoginDto): Observable<UserLoginDto>

  public abstract register(credentials: UserLoginDto): Observable<UserLoginDto>

  public abstract manageBusiness(manageData: ManageBusinessData): Observable<any>
}
