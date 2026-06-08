import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_ORG_SECRETS } from './actions-list-org-secrets.token';
import type { ActionsListOrgSecretsResponse } from './actions-list-org-secrets.token';

export function provideActionsListOrgSecretsMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListOrgSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_ORG_SECRETS,
    'ACTIONS_LIST_ORG_SECRETS',
    initialBehavior,
  );
}
