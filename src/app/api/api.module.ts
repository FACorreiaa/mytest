import { NgModule, ModuleWithProviders, Optional, SkipSelf, APP_INITIALIZER, InjectionToken, Injectable, ErrorHandler, Injector } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule, RequestOptions, Http, Headers, XHRBackend } from '@angular/http'

import { ApiHttpService, applicationHttpClientCreator } from './http/http.service'
import { IDashBoardService } from './interfaces/i.dashboard.service'
import { DashBoardService } from './services/core/dashboard.service'
import { IProfileService } from './interfaces/i.profile.service'
import { ProfileService } from './services/core/profile.service'
import { IReviewService } from './interfaces/i.review.service'
import { ReviewService } from './services/core/review.service'
import { IAuthorizationService } from './interfaces/i.authorization.service'
import { AuthorizationService } from './services/core/authorization.service'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'
import { HttpErrorInterceptor } from './http/http-error.interceptor'
import * as Rollbar from 'rollbar'
import { IRestaurantAssistentService } from './interfaces/i.restaurant-assistent.service'
import { RestaurantAssistentService } from './services/core/restaurant-assistent.service'

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
        {
          provide: IProfileService,
          useClass: ProfileService,
        },
        {
          provide: IReviewService,
          useClass: ReviewService,
        },
        {
          provide: IRestaurantAssistentService,
          useClass: RestaurantAssistentService,
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
