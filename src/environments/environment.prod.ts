import { KeycloakConfig } from 'keycloak-angular'
import { EnvironmentInterface } from '@env/environment-interface'

// DEV - Temporary until we have PRD environment
const keycloakConfig: KeycloakConfig = {
  url: 'https://dev.sso.app.hd.digital/auth',
  realm: 'HDCustomers-nonprod',
  clientId: 'claimingservice',
  credentials: {
    secret: 'f016c8e4-98e7-4f81-871b-3c8121d79d0e',
  },
}

// PRD
// const keycloakConfig: KeycloakConfig = {
//   url: 'https://sso.dish.co/auth',
//   realm: 'HD-SSO',
//   clientId: 'claimingservice',
//   credentials: {
//     secret: 'c108deea-b47a-4f06-91f6-cc16f3e5cb9f',
//   },
// }

export const environment: EnvironmentInterface = {
  appName: 'Ubicus',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  API_URL: 'http://ubicus.dev.app.hd.digital/api/v1',
  TOKEN_PATH: 'CSA_Token',
  keycloak: keycloakConfig,
  testMode: false,
}
