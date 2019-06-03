import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { NgxPermissionsModule, NgxPermissionsGuard } from 'ngx-permissions'

import { AppRoutes } from '../app.routing'
import { AuthGuard } from './auth.guard'

// COMPONENTS
import { AuthComponent } from './auth.component'
import { WizardComponent } from './containers/wizard.component'
import { ErrorComponent } from './containers/error.component'

// Modules
import { CoreModule } from '@app/core/core.module'

import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './store/effects/auth.effects'
import { ModalTermsConditionsComponent } from '@app/core/components/modal/model-term-conditions'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import { AuthRoutingModule } from './auth.routing'

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    EffectsModule.forFeature([AuthEffects]),
    NgxPermissionsModule.forChild(),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  declarations: [AuthComponent, WizardComponent, ErrorComponent],
  entryComponents: [ModalTermsConditionsComponent],
  // providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/auth/`, '.json')
}
