import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { DashboardComponent } from './containers/dashboard.component'
import { BusinessComponent } from './components/business.component'
import { DashboardRoutingModule } from './dashboard.routing'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { DashBoardEffects } from './store/effects/dashboard.effects'

import { reducers, reducerName } from './dashboard.selector'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { environment } from '@env/environment'
import { CoreModule } from '@app/core/core.module'

// Ng-bootstrap
import { NgbRatingModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  imports: [
    CoreModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgbProgressbarModule,
    DashboardRoutingModule,
    StoreModule.forFeature(reducerName, reducers),
    EffectsModule.forFeature([DashBoardEffects]),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  exports: [RouterModule],
  declarations: [DashboardComponent, BusinessComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/main/`, '.json')
}
