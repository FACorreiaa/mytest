import { Observable } from 'rxjs'
import { UserLoginDto } from '@app/api/models/api-models'

export abstract class IAuthorizationService {
  public abstract login(credentials: UserLoginDto): Observable<UserLoginDto>
}
