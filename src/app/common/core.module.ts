import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'

// Material
import { MaterialModule } from '@app/material.module'

// Ng-bootstrap
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap'

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
import { NavigationBarComponent } from './components/nav-bar.component'
import { RouterModule } from '@angular/router'
import { ProgressBarComponent } from './components/progress-bar.component'

@NgModule({
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, HttpModule, TranslateModule, RouterModule, NgbPopoverModule],
  exports: [
    CsStepperComponent,
    ModalTermsConditionsComponent,
    CommonModule,
    LoadingRequestComponent,
    SideNavComponent,
    NavigationBarComponent,
    ProgressBarComponent,
    MaterialModule,
    RouterModule,
  ],
  declarations: [
    CsStepperComponent,
    ModalTermsConditionsComponent,
    DisableControlDirective,
    LoadingRequestComponent,
    SideNavComponent,
    NavigationBarComponent,
    ProgressBarComponent,
    GooglePlacesDirective,
  ],
  providers: [CategoriesService, CountriesService],
})
export class CoreModule {}
