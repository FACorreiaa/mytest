import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import * as fromMain from '../main.selectors'
import * as TermsActions from '../store/actions/terms-cond.action'
import * as AuthActions from '../../auth/store/actions/auth.action'
import { TermsConditionsGetResponse } from '@app/api/models/api-models'
import { Observable } from 'rxjs'
import { ISubscription } from 'rxjs/Subscription'

@Component({
  selector: 'terms-conditions',
  templateUrl: 'terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})
export class TermsConditionsComponent implements OnInit, OnDestroy {
  private subscription: ISubscription
  formAcceptTermsConditions: FormGroup
  showTermConditiValidation = false
  checkAcceptens: boolean
  getResponse: Observable<TermsConditionsGetResponse>

  constructor(private formBuilder: FormBuilder, private mainStore: Store<fromMain.MainState>) {
    this.mainStore.dispatch(new AuthActions.NavMenuLayoutHide())
    this.getResponse = this.mainStore.select(fromMain.getTermsConditionsState)
  }

  ngOnInit() {
    this.formAcceptTermsConditions = this.formBuilder.group({
      termsConditions: [''],
    })
    this.subscription = this.getResponse.subscribe((getResponse: TermsConditionsGetResponse) => {
      this.checkAcceptens = getResponse.accepted
    })
  }

  ngOnDestroy() {
    this.mainStore.dispatch(new AuthActions.NavMenuLayoutShow())
    this.subscription.unsubscribe()
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
