import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular'
import { NgxPermissionsService } from 'ngx-permissions'

@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService, private permissionService: NgxPermissionsService) {
    super(router, keycloakAngular)
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login()
        return
      }

      this.permissionService.loadPermissions(this.roles)

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
}
