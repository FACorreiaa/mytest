import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProfileComponent } from './containers/profile.component'
import { ProfileFormComponent } from '@app/core/components/profile-form/profile-form.component'
import { ProfileRoutingModule } from './profile.routing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { ProfileEffects } from './store/effects/profile.effects'

import { reducerName, reducers } from './profile.selector'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { environment } from '@env/environment'
import { CoreModule } from '@app/core/core.module'

// Ng-bootstrap
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    NgbProgressbarModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(reducerName, reducers),
    EffectsModule.forFeature([ProfileEffects]),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  exports: [RouterModule],
  declarations: [ProfileComponent, ProfileFormComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/main/`, '.json')
}
