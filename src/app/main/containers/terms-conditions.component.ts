import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subject } from 'rxjs/internal/Subject'
import { Observable } from 'rxjs/internal/Observable'

import * as fromMain from '../main.selectors'
import * as TermsActions from '../store/actions/terms-cond.action'
import * as AuthActions from '../../auth/store/actions/auth.action'
import { TermsAndConditions } from '@app/api/models/api-models'

@Component({
  selector: 'terms-conditions',
  templateUrl: 'terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})
export class TermsConditionsComponent implements OnInit, OnDestroy {
  private subscription: Subject<void> = new Subject<void>()
  formAcceptTermsConditions: FormGroup
  showTermConditiValidation = false
  checkAcceptens: boolean
  getResponse: Observable<TermsAndConditions>

  constructor(private formBuilder: FormBuilder, private mainStore: Store<fromMain.MainState>) {
    this.getResponse = this.mainStore.select(fromMain.getTermsConditions)
  }

  ngOnInit() {
    this.formAcceptTermsConditions = this.formBuilder.group({
      termsConditions: [''],
    })

    this.getResponse.subscribe((getResponse: TermsAndConditions) => {
      this.checkAcceptens = getResponse.accepted

      if (!this.checkAcceptens) {
        this.mainStore.dispatch(new AuthActions.NavMenuLayoutHide())
      }
    })
  }

  ngOnDestroy() {
    this.mainStore.dispatch(new AuthActions.NavMenuLayoutShow())
    this.subscription.next()
    this.subscription.complete()
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
