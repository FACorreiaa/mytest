import { KeycloakConfig } from 'keycloak-angular'
import { EnvironmentInterface } from '@env/environment-interface'

const keycloakConfig: KeycloakConfig = {
  url: 'https://stage.sso.app.hd.digital/auth',
  realm: 'HD-SSO',
  clientId: 'claimingservice',
  credentials: {
    secret: 'f50bbd0c-56fe-4069-9412-612673bf6d21',
  },
}

export const environment: EnvironmentInterface = {
  appName: 'Ubicus',
  envName: 'STG',
  production: true,
  test: false,
  i18nPrefix: '',
  API_URL: 'http://ubicus.dev.app.hd.digital/api/v1',
  TOKEN_PATH: 'CSA_Token',
  keycloak: keycloakConfig,
  testMode: false,
}
