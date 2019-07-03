import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ReviewComponent } from './containers/review.component'
import { ReviewRoutingModule } from './review.routing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { ReviewEffects } from './store/effects/review.effects'

import { reducerName, reducers } from './review.selector'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { environment } from '@env/environment'
import { CoreModule } from '@app/core/core.module'

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReviewRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(reducerName, reducers),
    EffectsModule.forFeature([ReviewEffects]),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  exports: [RouterModule],
  declarations: [ReviewComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/main/`, '.json')
}
