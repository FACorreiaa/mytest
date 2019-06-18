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
            onLoad: 'check-sso',
            checkLoginIframe: false,
          },
          enableBearerInterceptor: true,
          bearerExcludedUrls: ['/assets', '/clients/public', '/google'],
          bearerPrefix: '',
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}
