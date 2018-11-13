import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'

import * as fromApp from '../../app.reducers'
import { AppRoutes as AuthRoutes } from '../../app.routing'

@Component({
  selector: 'app-error',
  templateUrl: 'error.component.html',
  styleUrls: ['error.component.scss'],
})
export class ErrorComponent implements OnInit {
  error$: Observable<string>
  error: any

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.select(fromApp.errorMessage).subscribe((error: any) => {
      if (error) {
        this.error = error instanceof ProgressEvent && error ? 'Please, check your connection.' : error.replace('{"error":"', '').replace('"}', '')
      }
    })

    if (!this.error) {
      this.router.navigate([AuthRoutes.LOGIN])
    }
  }

  GoToMainPage() {
    this.router.navigate([AuthRoutes.MAIN])
  }
}
