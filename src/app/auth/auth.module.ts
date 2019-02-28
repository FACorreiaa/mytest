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
import { ErrorComponent } from './containers/error.component'

// Modules
import { CoreModule } from '@app/common/core.module'

// Material
import { MaterialModule } from '../material.module'

import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './store/effects/auth.effects'
import { ModalTermsConditionsComponent } from '@app/common/components/model-term-conditions'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'

// Routing
const AuthRoutingModule = RouterModule.forChild([
  { path: '', redirectTo: AppRoutes.WIZARD, pathMatch: 'full' },
  { path: AppRoutes.WIZARD, component: WizardComponent },
  { path: AppRoutes.LOGIN, component: LoginComponent },
  { path: AppRoutes.ERROR, component: ErrorComponent },
  { path: 'main', canActivate: [AuthGuard], loadChildren: '../main/main.module#MainModule' },
])

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    EffectsModule.forFeature([AuthEffects]),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  declarations: [AuthComponent, WizardComponent, LoginComponent, ErrorComponent],
  entryComponents: [ModalTermsConditionsComponent],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/auth/`, '.json')
}
