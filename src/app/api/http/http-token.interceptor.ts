import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { KeycloakService } from 'keycloak-angular'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('TokenInterceptor', this.keycloakService.getToken())

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.keycloakService.getToken()}`,
      },
    })

    return next.handle(request)
  }
}
