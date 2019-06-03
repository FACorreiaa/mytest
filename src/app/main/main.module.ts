import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CoreModule } from '@app/core/core.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { MainRoutingModule } from './main.routing'
import { environment } from '@env/environment'
import { MainComponent } from './main.component'

@NgModule({
  imports: [
    // StoreModule.forFeature(reducerName, reducers),
    MainRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    // EffectsModule.forFeature([DashBoardEffects]),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  declarations: [MainComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/main/`, '.json')
}
