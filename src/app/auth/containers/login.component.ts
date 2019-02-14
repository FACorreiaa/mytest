import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { EmailValidation, PasswordValidation } from '@app/common/validations'
import { Store, select } from '@ngrx/store'

import * as AuthActions from '../store/actions/auth.action'
import * as fromApp from '../../app.reducers'
import { Observable, Subject } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { delay, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  private userSubscription$: Subject<void> = new Subject<void>()
  formLogin: FormGroup
  loading$: Observable<boolean>
  language$: Observable<string>

  constructor(private formBuilder: FormBuilder, private store: Store<fromApp.AppState>, private readonly translate: TranslateService) {}

  ngOnInit() {
    this.loading$ = this.store.select(fromApp.loginLoading)

    this.store
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.userSubscription$)
      )
      .subscribe(lang => this.translate.use(lang))

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
