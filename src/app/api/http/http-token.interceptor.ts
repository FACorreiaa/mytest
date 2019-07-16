import { Injectable, Injector } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { KeycloakService } from 'keycloak-angular'
import { from } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'
import { environment as env } from '@env/environment'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService, injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.keycloakService.addTokenToHeader(req.headers).pipe(
      mergeMap(headersWithBearer => {
        if (env.envName === 'DEV' && env.testMode) {
          let newParams = new HttpParams({ fromString: req.params.toString() })
          newParams = newParams.append('testMode', 'true')

          const kcReq = req.clone({ setHeaders: { Authorization: headersWithBearer.get('authorization') }, params: newParams })
          return next.handle(kcReq)
        } else {
          const kcReq = req.clone({ setHeaders: { Authorization: headersWithBearer.get('authorization') } })
          return next.handle(kcReq)
        }
      })
    )
  }
}
