import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_ORG_SECRETS } from './codespaces-list-org-secrets.token';
import type { CodespacesListOrgSecretsResponse } from './codespaces-list-org-secrets.token';

export function provideCodespacesListOrgSecretsMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListOrgSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_ORG_SECRETS,
    'CODESPACES_LIST_ORG_SECRETS',
    initialBehavior,
  );
}
