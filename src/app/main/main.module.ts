import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

// CONTAINERS
import { MainComponent } from './main.component'
import { DashboardComponent } from './containers/dashboard.component'
import { BusinessDetailComponent } from './containers/business-detail.component'
import { AddBusinessComponent } from './containers/add-business.component'

// COMPONENTS
import { BusinnessComponent } from './components/business.component'

import { reducers, reducerName } from './main.reducers'
import { MainRoutingModule } from './main.routing'
import { DashBoardEffects } from './store/effects/dashboard.effects'
import { MaterialModule } from '@app/material.module'
import { CoreModule } from '@app/common/core.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

@NgModule({
  imports: [
    StoreModule.forFeature(reducerName, reducers),
    MainRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    EffectsModule.forFeature([DashBoardEffects]),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  declarations: [MainComponent, DashboardComponent, BusinnessComponent, BusinessDetailComponent, AddBusinessComponent],
  exports: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/main/`, '.json')
}
