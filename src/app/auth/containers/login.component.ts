import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { EmailValidation, PasswordValidation } from '@app/common/validations'
import { Store } from '@ngrx/store'

import * as AuthActions from '../store/actions/auth.action'
import * as fromApp from '../../app.reducers'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup

  constructor(private formBuilder: FormBuilder, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })
  }

  login(formLogin: FormGroup) {
    this.store.dispatch(new AuthActions.LoginAttempt(formLogin.value))
  }
}
