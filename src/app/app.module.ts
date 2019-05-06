import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule, APP_BASE_HREF } from '@angular/common'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular'

import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { ApiModule } from './api/api.module'
import { AppRoutingModule } from './app.routing'

// Components
import { AppComponent } from './app.component'

// Material
import { MaterialModule } from './material.module'

// Redux
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store'
import { appReducers } from '@app/app.reducers'
import { localStorageSync } from 'ngrx-store-localstorage'
import { HttpModule } from '@angular/http'
import { EffectsModule } from '@ngrx/effects'
import { GlobalEnvironmentService } from './global.environment.service'
import { environment } from '@env/environment'
import { debug } from '@app/debug.reducer'
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CoreModule } from './core/core.module'
import { initializer } from './core/utils/app-init'
import { TokenInterceptor } from './api/http/http-token.interceptor'
import { NgxPermissionsModule } from 'ngx-permissions'

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  const localStorage = localStorageSync({ rehydrate: true, keys: ['auth'] })(reducer)
  return localStorage
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer]

// if (!environment.production) {
//   metaReducers.unshift(debug)
// }

@NgModule({
  imports: [
    ApiModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgxPermissionsModule.forRoot(),
    // ngx-translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    MaterialModule,
    KeycloakAngularModule,
    // ngrx
    StoreModule.forRoot(appReducers, { metaReducers }),
    // StoreDevtoolsModule.instrument({ maxAge: 15 }),
  ],
  declarations: [AppComponent],
  exports: [MaterialModule],
  providers: [
    GlobalEnvironmentService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/`, '.json')
}
