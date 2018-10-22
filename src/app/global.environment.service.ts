import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'

export enum Environment {
  Dev = 1,
  Prod = 2,
}

@Injectable()
export class GlobalEnvironmentService {
  public getEnvironment(): Environment {
    if (environment.envName === 'DEV') {
      return Environment.Dev
    }

    return Environment.Prod
  }

  public getApiUrl(): string {
    return environment.API_URL
  }

  public getTokenPath(): string {
    return environment.TOKEN_PATH
  }
}
