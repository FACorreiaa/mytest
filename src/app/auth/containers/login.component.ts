import { Component, OnInit, OnDestroy } from '@angular/core'
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
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  formLogin: FormGroup
  loading$: Observable<boolean>
  language$: Observable<string>

  constructor(private formBuilder: FormBuilder, private store: Store<fromApp.AppState>, private translate: TranslateService) {}

  ngOnInit() {
    this.translate.setDefaultLang('en')

    this.loading$ = this.store.select(fromApp.loginLoading)

    this.store
      .pipe(
        delay(0),
        select(fromApp.language),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(lang => this.translate.use(lang))

    this.formLogin = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })

    this.store.dispatch(new AuthActions.Logout({}))
  }

  login(formLogin: FormGroup) {
    // this.store.dispatch(new AuthActions.LoginAttempt(formLogin.value))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
