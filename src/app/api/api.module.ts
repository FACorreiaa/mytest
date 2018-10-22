import { NgModule, ModuleWithProviders, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule, RequestOptions, Http, Headers, XHRBackend } from '@angular/http'

import { ApiHttpService } from './http/http.service'
import { AuthorizationService } from '../api/services/core/authorization.service'
import { IAuthorizationService } from '../api/interfaces/i.authorization.service'

export function ApiHttpServiceFactory(backend: XHRBackend, options: RequestOptions) {
  return new ApiHttpService(backend, options)
}

@NgModule({
  imports: [CommonModule, HttpModule],
  providers: [
    {
      provide: ApiHttpService,
      useFactory: ApiHttpServiceFactory,
      deps: [XHRBackend, RequestOptions],
    },
  ],
})
export class ApiModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [{ provide: IAuthorizationService, useClass: AuthorizationService }],
    }
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: ApiModule
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import it in the AppModule only')
    }
  }
}
