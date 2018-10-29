import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, ErrorHandler } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

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
import { HttpClientModule } from '@angular/common/http'

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  const localStorage = localStorageSync({ rehydrate: true, keys: ['auth'] })(reducer)
  return localStorage
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer]

if (!environment.production) {
  metaReducers.unshift(debug)
}

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
    EffectsModule.forRoot([]),
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
  ],
  declarations: [AppComponent],
  exports: [MaterialModule],
  providers: [GlobalEnvironmentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
