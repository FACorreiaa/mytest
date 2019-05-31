import { Component, OnDestroy, OnInit } from '@angular/core'
import { AppRoutes as AuthRoutes } from './app.routing'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as fromApp from './app.reducers'
import * as AuthActions from './auth/store/actions/auth.action'
import { takeUntil, delay } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { KeycloakService } from 'keycloak-angular'
import { KeycloakProfile } from 'keycloak-js'
import { NgxPermissionsService } from 'ngx-permissions'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HeaderService } from './api/services/core/header.service'

/**
 * The app component.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
