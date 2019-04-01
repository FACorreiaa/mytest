import { KeycloakConfig } from 'keycloak-angular'

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  /** localhost **/
  //   url: 'http://localhost:8080/auth',
  //   realm: 'master',
  //   clientId: 'my-angular-app',
  // }

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
}
