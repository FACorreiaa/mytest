import { KeycloakConfig } from 'keycloak-angular'

export interface EnvironmentInterface {
  appName: string
  envName: string
  production: boolean
  test: boolean
  i18nPrefix: string
  API_URL: string
  TOKEN_PATH: string
  keycloak: KeycloakConfig
  testMode: boolean
}
