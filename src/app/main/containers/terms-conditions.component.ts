import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import * as fromMain from '../main.selectors'
import * as TermsActions from '../store/actions/terms-cond.action'
import { TermsConditionsPostRequest } from '@app/api/models/api-models'

@Component({
  selector: 'terms-conditions',
  templateUrl: 'terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})
export class TermsConditionsComponent implements OnInit {
  formAcceptTermsConditions: FormGroup
  showTermConditiValidation = false

  constructor(private formBuilder: FormBuilder, private mainStore: Store<fromMain.MainState>) {}

  ngOnInit() {
    this.formAcceptTermsConditions = this.formBuilder.group({
      termsConditions: [''],
    })
  }

  /**
   * Confirm terms and condtions form.
   */
  confirm(formAcceptTermsConditions: FormGroup) {
    if (!formAcceptTermsConditions.get('termsConditions').value) {
      console.log('confirmmmm')

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
