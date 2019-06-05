import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { KeycloakService } from 'keycloak-angular'
import { from } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.keycloakService.addTokenToHeader(req.headers).pipe(
      mergeMap(headersWithBearer => {
        const kcReq = req.clone({ setHeaders: { Authorization: headersWithBearer.get('authorization') } })
        return next.handle(kcReq)
      })
    )
  }
}
