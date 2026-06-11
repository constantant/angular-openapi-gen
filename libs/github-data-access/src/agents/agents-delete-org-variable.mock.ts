import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_DELETE_ORG_VARIABLE } from './agents-delete-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/delete-org-variable',
  path: '/orgs/{org}/agents/variables/{name}',
  method: 'delete',
  tag: 'agents',
};

export function provideAgentsDeleteOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_DELETE_ORG_VARIABLE,
    'AGENTS_DELETE_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
