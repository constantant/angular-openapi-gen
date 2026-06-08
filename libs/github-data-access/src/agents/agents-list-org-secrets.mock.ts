import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_ORG_SECRETS } from './agents-list-org-secrets.token';
import type { AgentsListOrgSecretsResponse } from './agents-list-org-secrets.token';

export function provideAgentsListOrgSecretsMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListOrgSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_ORG_SECRETS,
    'AGENTS_LIST_ORG_SECRETS',
    initialBehavior,
  );
}
