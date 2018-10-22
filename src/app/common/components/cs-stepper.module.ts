import { NgModule } from '@angular/core'
import { CsStepperComponent } from '@app/common/components/cs-stepper.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

// Material
import { MaterialModule } from '@app/material.module'
import { CategoriesService } from '@app/common/services/categories.service'
import { HttpModule } from '@angular/http'
import { ModalTermsConditionsComponent } from '@app/common/components/model-term-conditions'
import { DisableControlDirective } from '@app/common/directives/disable-control.directive'

@NgModule({
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, HttpModule],
  exports: [CsStepperComponent, ModalTermsConditionsComponent, CommonModule],
  declarations: [CsStepperComponent, ModalTermsConditionsComponent, DisableControlDirective],
  providers: [CsStepperComponent, ModalTermsConditionsComponent, CategoriesService],
  entryComponents: [ModalTermsConditionsComponent],
})
export class CsStepperModule {}
