import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_ORG_VARIABLES } from './actions-list-org-variables.token';
import type { ActionsListOrgVariablesResponse } from './actions-list-org-variables.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-org-variables',
  path: '/orgs/{org}/actions/variables',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListOrgVariablesMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListOrgVariablesResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_ORG_VARIABLES,
    'ACTIONS_LIST_ORG_VARIABLES',
    initialBehavior,
    _meta,
    options,
  );
}
