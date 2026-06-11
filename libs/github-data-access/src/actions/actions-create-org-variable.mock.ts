import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_ORG_VARIABLE } from './actions-create-org-variable.token';
import type { ActionsCreateOrgVariableResponse } from './actions-create-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/create-org-variable',
  path: '/orgs/{org}/actions/variables',
  method: 'post',
  tag: 'actions',
};

export function provideActionsCreateOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_ORG_VARIABLE,
    'ACTIONS_CREATE_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
