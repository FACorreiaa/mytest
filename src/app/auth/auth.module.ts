import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { AppRoutes } from '../app.routing'
import { AuthGuard } from './auth.guard'

// COMPONENTS
import { AuthComponent } from './auth.component'
import { WizardComponent } from './containers/wizard.component'
import { LoginComponent } from './containers/login.component'
import { CsStepperModule } from '@app/common/components/cs-stepper.module'

// Material
import { MaterialModule } from '../material.module'

import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './store/effects/auth.effects'
import { ModalTermsConditionsComponent } from '@app/common/components/model-term-conditions'

// Routing
const AuthRoutingModule = RouterModule.forChild([
  { path: '', redirectTo: AppRoutes.WIZARD, pathMatch: 'full' },
  { path: AppRoutes.WIZARD, component: WizardComponent },
  { path: AppRoutes.LOGIN, component: LoginComponent },
  { path: 'main', canActivate: [AuthGuard], loadChildren: '../main/main.module#MainModule' },
])

@NgModule({
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule, CsStepperModule, EffectsModule.forFeature([AuthEffects])],
  declarations: [AuthComponent, WizardComponent, LoginComponent],
  entryComponents: [ModalTermsConditionsComponent],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
