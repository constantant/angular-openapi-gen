import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ORG_SECRET } from './actions-delete-org-secret.token';

export function provideActionsDeleteOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ORG_SECRET,
    'ACTIONS_DELETE_ORG_SECRET',
    initialBehavior,
  );
}
