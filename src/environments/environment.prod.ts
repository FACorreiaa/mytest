import { KeycloakConfig } from 'keycloak-angular'
import { EnvironmentInterface } from '@env/environment-interface'

// DEV
const keycloakConfig: KeycloakConfig = {
  url: 'https://dev.sso.app.hd.digital/auth',
  realm: 'HDCustomers-nonprod',
  clientId: 'claimingservice',
  credentials: {
    secret: 'f016c8e4-98e7-4f81-871b-3c8121d79d0e',
  },
}

// ACC
/*
const keycloakConfig: KeycloakConfig = {
  url: 'https://acc.sso.app.hd.digital/auth',
  realm: 'Acceptance',
  clientId: 'claimingservice',
  credentials: {
    secret: '005accc6-2abb-49a9-bdae-c4e0228c9d67',
  },
}
*/

export const environment: EnvironmentInterface = {
  appName: 'Claiming service',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  API_URL: 'https://backend-dot-hd-claimingfe-dev.appspot.com/api/v1',
  TOKEN_PATH: 'CSA_Token',
  keycloak: keycloakConfig,
  testMode: false,
}
