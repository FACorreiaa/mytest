import { NgModule, ModuleWithProviders, Optional, SkipSelf, APP_INITIALIZER, InjectionToken, Injectable, ErrorHandler, Injector } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule, RequestOptions, Http, Headers, XHRBackend } from '@angular/http'

import { ApiHttpService, applicationHttpClientCreator } from './http/http.service'
import { AuthorizationService } from '../api/services/core/authorization.service'
import { IAuthorizationService } from '../api/interfaces/i.authorization.service'
import { IDashBoardService } from './interfaces/i.dashboard.service'
import { DashBoardService } from './services/core/dashboard.service'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'
import { HttpErrorInterceptor } from './http/http-error.interceptor'
import * as Rollbar from 'rollbar'

const rollbarConfig = {
  accessToken: '9138b9a5aa794f47b73712a51da0aca5',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig)
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar')

@NgModule({
  imports: [CommonModule, HttpModule, HttpClientModule],
  providers: [
    {
      provide: ApiHttpService,
      useFactory: applicationHttpClientCreator,
      deps: [HttpClient],
    },
    {
      provide: RollbarService,
      useFactory: rollbarFactory,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class ApiModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: IAuthorizationService,
          useClass: AuthorizationService,
        },
        {
          provide: IDashBoardService,
          useClass: DashBoardService,
        },
      ],
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
