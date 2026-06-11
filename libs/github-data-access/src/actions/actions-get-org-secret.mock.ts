import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ORG_SECRET } from './actions-get-org-secret.token';
import type { ActionsGetOrgSecretResponse } from './actions-get-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-org-secret',
  path: '/orgs/{org}/actions/secrets/{secret_name}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ORG_SECRET,
    'ACTIONS_GET_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
