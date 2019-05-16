import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'

// Material
import { MaterialModule } from '@app/material.module'

// Ng-bootstrap
import { NgbPopoverModule, NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

// Services
import { CategoriesService } from '@app/core/services/categories.service'
import { CountriesService } from '@app/core/services/countries.service'

import { CsStepperComponent } from '@app/core/components/stepper/cs-stepper.component'
import { ModalTermsConditionsComponent } from '@app/core/components/modal/model-term-conditions'
import { DisableControlDirective } from '@app/core/directives/disable-control.directive'
import { LoadingRequestComponent } from './components/spinners/loading.component'
import { GooglePlacesDirective } from './directives/google-places.directive'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { NavigationBarComponent } from './components/navigation-bar/nav-bar.component'
import { RouterModule } from '@angular/router'
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component'
import { ModalOtherVerifiComponent } from './components/modal/modal-other-verifi-component'

@NgModule({
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, HttpModule, TranslateModule, RouterModule, NgbPopoverModule, NgbModalModule],
  exports: [
    CsStepperComponent,
    ModalOtherVerifiComponent,
    ModalTermsConditionsComponent,
    CommonModule,
    LoadingRequestComponent,
    NavigationBarComponent,
    ProgressBarComponent,
    MaterialModule,
    RouterModule,
  ],
  declarations: [
    CsStepperComponent,
    ModalOtherVerifiComponent,
    ModalTermsConditionsComponent,
    DisableControlDirective,
    LoadingRequestComponent,
    NavigationBarComponent,
    ProgressBarComponent,
    GooglePlacesDirective,
  ],
  providers: [CategoriesService, CountriesService, NgbActiveModal],
  entryComponents: [ModalOtherVerifiComponent],
})
export class CoreModule {}
