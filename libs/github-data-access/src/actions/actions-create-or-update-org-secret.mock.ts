import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_OR_UPDATE_ORG_SECRET } from './actions-create-or-update-org-secret.token';
import type { ActionsCreateOrUpdateOrgSecretResponse } from './actions-create-or-update-org-secret.token';

export function provideActionsCreateOrUpdateOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateOrUpdateOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_OR_UPDATE_ORG_SECRET,
    'ACTIONS_CREATE_OR_UPDATE_ORG_SECRET',
    initialBehavior,
  );
}
