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
import { LoadingRequestComponent } from './loading.component'
import { SideNavComponent } from './side-nav.component'
import { EditTabsComponent } from './edit-tabs.component'
import { GooglePlacesDirective } from '../directives/google-places.directive'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'

@NgModule({
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, HttpModule, TranslateModule],
  exports: [CsStepperComponent, EditTabsComponent, ModalTermsConditionsComponent, CommonModule, LoadingRequestComponent, SideNavComponent],
  declarations: [CsStepperComponent, EditTabsComponent, ModalTermsConditionsComponent, DisableControlDirective, LoadingRequestComponent, SideNavComponent, GooglePlacesDirective],
  providers: [CsStepperComponent, EditTabsComponent, ModalTermsConditionsComponent, LoadingRequestComponent, SideNavComponent, CategoriesService, CountriesService],
  entryComponents: [ModalTermsConditionsComponent, LoadingRequestComponent, SideNavComponent],
})
export class CsStepperModule {}
