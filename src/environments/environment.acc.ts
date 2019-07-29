import { KeycloakConfig } from 'keycloak-angular'
import { EnvironmentInterface } from '@env/environment-interface'

const keycloakConfig: KeycloakConfig = {
  url: 'https://acc.sso.app.hd.digital/auth',
  realm: 'Acceptance',
  clientId: 'claimingservice',
  credentials: {
    secret: '005accc6-2abb-49a9-bdae-c4e0228c9d67',
  },
}

export const environment: EnvironmentInterface = {
  appName: 'Ubicus',
  envName: 'ACC',
  production: true,
  test: false,
  i18nPrefix: '',
  API_URL: 'http://ubicus.dev.app.hd.digital/api/v1',
  TOKEN_PATH: 'CSA_Token',
  keycloak: keycloakConfig,
  testMode: false,
}
