import { KeycloakConfig } from 'keycloak-angular'
import { EnvironmentInterface } from '@env/environment-interface'

const keycloakConfig: KeycloakConfig = {
  /** HD Digital **/
  url: 'http://dev.sso.app.hd.digital/auth',
  realm: 'HDCustomers-nonprod',
  clientId: 'localhost-8081',
  credentials: {
    secret: '3018ccf8-1351-4fac-ad70-b0672d9cd66c',
  },
}

export const environment: EnvironmentInterface = {
  appName: 'Claiming service',
  envName: 'DEV',
  production: false,
  test: false,
  i18nPrefix: '',
  API_URL: 'http://ubicus.dev.app.hd.digital/api/v1',
  TOKEN_PATH: 'CSA_Token',
  keycloak: keycloakConfig,
  testMode: true,
}
