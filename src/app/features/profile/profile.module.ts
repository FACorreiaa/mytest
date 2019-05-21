import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RouterModule } from '@angular/router'
import { ProfileRoutingModule } from './profile.routing'
import { ProfileComponent } from './containers/profile.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import { CoreModule } from '@app/core/core.module'
import { ProfileFormComponent } from '@app/core/components/profile-form/profile-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    NgbProgressbarModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
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
export class ProfileModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/main/`, '.json')
}
