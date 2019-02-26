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
import { EditTabsComponent } from './components/edit-tabs.component'
import { GooglePlacesDirective } from './directives/google-places.directive'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, HttpModule, TranslateModule],
  exports: [CsStepperComponent, EditTabsComponent, ModalTermsConditionsComponent, CommonModule, LoadingRequestComponent, SideNavComponent],
  declarations: [CsStepperComponent, EditTabsComponent, ModalTermsConditionsComponent, DisableControlDirective, LoadingRequestComponent, SideNavComponent, GooglePlacesDirective],
  providers: [CategoriesService, CountriesService],
})
export class CoreModule {}
