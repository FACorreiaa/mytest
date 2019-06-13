import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CoreModule } from '@app/core/core.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { MainRoutingModule } from './main.routing'
import { environment } from '@env/environment'
import { MainComponent } from './main.component'
import { TermsConditionsEffects } from './store/effects/terms-cond.effects'
import { reducers, reducerName } from './main.selectors'
import { TermsConditionsComponent } from './containers/terms-conditions.component'
import { ImprintComponent } from './containers/imprint/imprint.component'

@NgModule({
  imports: [
    MainRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    EffectsModule.forFeature([TermsConditionsEffects]),
    StoreModule.forFeature(reducerName, reducers),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  declarations: [MainComponent, TermsConditionsComponent, ImprintComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/main/`, '.json')
}
