import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
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
import { CollapsibleButtonComponent } from '@app/core/components/collapsible-button/collapsible-button.component'
import { PaymentsButtonComponent } from '@app/core/components/payments-button/payments-button.component'
import { ModalTermsConditionsComponent } from '@app/core/components/modal/model-term-conditions'
import { DisableControlDirective } from '@app/core/directives/disable-control.directive'
import { LoadingRequestComponent } from './components/spinners/loading.component'
import { GooglePlacesDirective } from './directives/google-places.directive'
import { TranslateModule } from '@ngx-translate/core'
import { NavigationBarComponent } from './components/navigation-bar/nav-bar.component'
import { RouterModule } from '@angular/router'
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component'
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component'
import { ModalOtherVerifiComponent } from './components/modal/modal-other-verifi-component'
import { ModalShowmoreComponent } from './components/modal-showmore/modal-showmore.component'
import { ModalShowmoreonboardComponent } from './components/modal-showmoreonboard/modal-showmoreonboard.component'
@NgModule({
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, HttpModule, TranslateModule, RouterModule, NgbPopoverModule, NgbModalModule],
  exports: [
    CsStepperComponent,
    CollapsibleButtonComponent,
    PaymentsButtonComponent,
    ModalOtherVerifiComponent,
    ModalTermsConditionsComponent,
    CommonModule,
    LoadingRequestComponent,
    NavigationBarComponent,
    ProgressBarComponent,
    ProgressSpinnerComponent,
    MaterialModule,
    RouterModule,
    TranslateModule,
  ],
  declarations: [
    CsStepperComponent,
    CollapsibleButtonComponent,
    PaymentsButtonComponent,
    ModalOtherVerifiComponent,
    ModalTermsConditionsComponent,
    DisableControlDirective,
    LoadingRequestComponent,
    NavigationBarComponent,
    ProgressBarComponent,
    ProgressSpinnerComponent,
    GooglePlacesDirective,
    ModalShowmoreComponent,
    ModalShowmoreonboardComponent,
  ],
  providers: [CategoriesService, CountriesService, NgbActiveModal],
  entryComponents: [ModalOtherVerifiComponent, ModalShowmoreComponent, ModalShowmoreonboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {}
