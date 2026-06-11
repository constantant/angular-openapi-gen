import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_UPDATE_ORG_VARIABLE } from './actions-update-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/update-org-variable',
  path: '/orgs/{org}/actions/variables/{name}',
  method: 'patch',
  tag: 'actions',
};

export function provideActionsUpdateOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_UPDATE_ORG_VARIABLE,
    'ACTIONS_UPDATE_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
