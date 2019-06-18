import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import * as fromMain from '../main.selectors'
import * as TermsActions from '../store/actions/terms-cond.action'
import * as AuthActions from '../../auth/store/actions/auth.action'

@Component({
  selector: 'terms-conditions',
  templateUrl: 'terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})
export class TermsConditionsComponent implements OnInit, OnDestroy {
  formAcceptTermsConditions: FormGroup
  showTermConditiValidation = false

  constructor(private formBuilder: FormBuilder, private mainStore: Store<fromMain.MainState>) {
    this.mainStore.dispatch(new AuthActions.NavMenuLayoutHide())
  }

  ngOnInit() {
    this.formAcceptTermsConditions = this.formBuilder.group({
      termsConditions: [''],
    })
  }

  ngOnDestroy() {
    this.mainStore.dispatch(new AuthActions.NavMenuLayoutShow())
  }

  /**
   * Confirm terms and condtions form.
   */
  confirm(formAcceptTermsConditions: FormGroup) {
    if (!formAcceptTermsConditions.get('termsConditions').value) {
      this.showTermConditiValidation = true
      return null
    }

    this.mainStore.dispatch(
      new TermsActions.TermsConditionsUpdateAttempt({
        request: { accepted: true },
      })
    )
  }
}
