import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CoreModule } from '@app/core/core.module'
import { CommonModule } from '@angular/common'
import { ReviewRoutingModule } from './review.routing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'
import { ReviewEffects } from './store/effects/review.effects'
import { reducerName, reducers } from './review.selector'
import { environment } from '@env/environment'

import { DateAgoPipe } from './pipes/date-ago.pipe'
import { ReviewComponent } from './containers/review.component'
import { ReviewListingComponent } from './components/review-listing/review-listing.component'
import { ReviewCommentComponent } from './components/review-comment/review-comment.component'

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    NgbModule,
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
  declarations: [ReviewComponent, ReviewListingComponent, ReviewCommentComponent, DateAgoPipe],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/main/`, '.json')
}
