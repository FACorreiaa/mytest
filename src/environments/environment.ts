import { KeycloakConfig } from 'keycloak-angular'

const keycloakConfig: KeycloakConfig = {
  /** HD Digital **/
  url: 'http://dev.sso.app.hd.digital/auth',
  realm: 'HDCustomers-nonprod',
  clientId: 'localhost-8081',
  credentials: {
    secret: '3018ccf8-1351-4fac-ad70-b0672d9cd66c',
  },
}

export const environment = {
  appName: 'Claiming service',
  envName: 'DEV',
  production: false,
  test: false,
  i18nPrefix: '',
  API_URL: 'https://backend-dot-hd-claimingfe-dev.appspot.com/api/v1',
  TOKEN_PATH: 'CSA_Token',
  keycloak: keycloakConfig,
  testMode: true,
}
