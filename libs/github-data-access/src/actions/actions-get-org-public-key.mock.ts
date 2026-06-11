import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ORG_PUBLIC_KEY } from './actions-get-org-public-key.token';
import type { ActionsGetOrgPublicKeyResponse } from './actions-get-org-public-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-org-public-key',
  path: '/orgs/{org}/actions/secrets/public-key',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetOrgPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetOrgPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ORG_PUBLIC_KEY,
    'ACTIONS_GET_ORG_PUBLIC_KEY',
    initialBehavior,
    _meta,
  );
}
