import { KeycloakService } from 'keycloak-angular'
import { environment } from '@env/environment'

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: environment.keycloak,
          initOptions: {
            // login-required
            onLoad: 'login-required',
            checkLoginIframe: false,
          },
          enableBearerInterceptor: true,
          bearerExcludedUrls: ['/assets', '/clients/public'],
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}
