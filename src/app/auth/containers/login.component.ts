import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { EmailValidation, PasswordValidation } from '@app/common/validations'
import { Store } from '@ngrx/store'

import * as AuthActions from '../store/actions/auth.action'
import * as fromApp from '../../app.reducers'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup
  loading$: Observable<boolean>

  constructor(private formBuilder: FormBuilder, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.loading$ = this.store.select(fromApp.loginLoading)

    this.formLogin = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })

    this.store.dispatch(new AuthActions.Logout({}))
  }

  login(formLogin: FormGroup) {
    this.store.dispatch(new AuthActions.LoginAttempt(formLogin.value))
  }
}
