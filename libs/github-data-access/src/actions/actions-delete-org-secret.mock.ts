import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ORG_SECRET } from './actions-delete-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-org-secret',
  path: '/orgs/{org}/actions/secrets/{secret_name}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ORG_SECRET,
    'ACTIONS_DELETE_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
