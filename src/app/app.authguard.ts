import { Injectable, OnDestroy } from '@angular/core'
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular'
import { NgxPermissionsService } from 'ngx-permissions'
import { Store, select } from '@ngrx/store'

import * as fromMain from '@app/main/main.selectors'
import { Subject } from 'rxjs'
import { takeUntil, delay } from 'rxjs/operators'
import { AppRoutes } from './app.routing'

@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard implements OnDestroy {
  private hasTermsConditions: boolean

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService,
    private permissionService: NgxPermissionsService,
    private mainStore: Store<fromMain.MainState>
  ) {
    super(router, keycloakAngular)
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login()
        return
      }

      this.permissionService.loadPermissions(this.roles)

      this.mainStore
        .pipe(
          delay(0),
          select(fromMain.getTermsConditionsState),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(terms => {
          this.hasTermsConditions = terms ? terms.accepted : false
          if (!this.hasTermsConditions) {
            this.navigateToTermsConditions()
            resolve(true)
          }
        })

      const requiredRoles = route.data.roles
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true)
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false)
        }
        let granted = false
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            granted = true
            break
          }
        }
        resolve(granted)
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe()
  }

  private navigateToTermsConditions(): void {
    this.router.navigate([AppRoutes.TERMS])
  }
}
