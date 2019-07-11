import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CoreModule } from '@app/core/core.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { MainRoutingModule } from './main.routing'
import { environment } from '@env/environment'
import { MainComponent } from './main.component'
import { TermsConditionsEffects } from './store/effects/terms-cond.effects'
import { reducers, reducerName } from './main.selectors'
import { TermsConditionsComponent } from './containers/terms-conditions.component'
import { AccManagementComponent } from './containers/acc-management/acc-management.component'
import { ImprintComponent } from './components/imprint/imprint.component'
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component'
import { CookieSettingsComponent } from './components/cookie-settings/cookie-settings.component'
import { DeleteAccComponent } from './components/delete-acc/delete-acc.component'
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component'
import { StatusLogComponent } from './containers/status-log/status-log.component'
import { TransferGmbComponent } from './components/transfer-gmb/transfer-gmb.component'
import { SendInviteComponent } from './components/send-invite/send-invite.component'
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component'

@NgModule({
  imports: [
    FontAwesomeModule,
    MainRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    EffectsModule.forFeature([TermsConditionsEffects]),
    StoreModule.forFeature(reducerName, reducers),
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      isolate: true,
    }),
  ],
  declarations: [
    AccManagementComponent,
    DeleteAccComponent,
    DeleteConfirmComponent,
    MainComponent,
    TermsConditionsComponent,
    ImprintComponent,
    DataPrivacyComponent,
    CookieSettingsComponent,
    StatusLogComponent,
    TransferGmbComponent,
    SendInviteComponent,
    ErrorDialogComponent,
  ],
  entryComponents: [CookieSettingsComponent, DeleteAccComponent, DeleteConfirmComponent, TransferGmbComponent, SendInviteComponent, ErrorDialogComponent],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/main/`, '.json')
}
