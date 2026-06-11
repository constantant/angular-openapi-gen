import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ORG_VARIABLE } from './actions-delete-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-org-variable',
  path: '/orgs/{org}/actions/variables/{name}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ORG_VARIABLE,
    'ACTIONS_DELETE_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
