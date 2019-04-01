import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'

// Material
import { MaterialModule } from '@app/material.module'

// Services
import { CategoriesService } from '@app/common/services/categories.service'
import { CountriesService } from '@app/common/services/countries.service'

import { CsStepperComponent } from '@app/common/components/cs-stepper.component'
import { ModalTermsConditionsComponent } from '@app/common/components/model-term-conditions'
import { DisableControlDirective } from '@app/common/directives/disable-control.directive'
import { LoadingRequestComponent } from './components/loading.component'
import { SideNavComponent } from './components/side-nav.component'
import { GooglePlacesDirective } from './directives/google-places.directive'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TranslateModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient],
    //   },
    // }),
  ],
  exports: [CsStepperComponent, ModalTermsConditionsComponent, CommonModule, LoadingRequestComponent, SideNavComponent, MaterialModule],
  declarations: [CsStepperComponent, ModalTermsConditionsComponent, DisableControlDirective, LoadingRequestComponent, SideNavComponent, GooglePlacesDirective],
  providers: [CategoriesService, CountriesService],
})
export class CoreModule {}

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n`, '.json')
// }
