import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { RouterModule } from '@angular/router'
import { ProfileRoutingModule } from './profile.routing'
import { ProfileComponent } from './profile.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

@NgModule({
  imports: [
    ProfileRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  exports: [RouterModule],
  declarations: [ProfileComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/main/`, '.json')
}
