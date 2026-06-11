import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ORG_VARIABLE } from './actions-get-org-variable.token';
import type { ActionsGetOrgVariableResponse } from './actions-get-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-org-variable',
  path: '/orgs/{org}/actions/variables/{name}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ORG_VARIABLE,
    'ACTIONS_GET_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
