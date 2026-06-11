import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_UPDATE_ORG_VARIABLE } from './agents-update-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/update-org-variable',
  path: '/orgs/{org}/agents/variables/{name}',
  method: 'patch',
  tag: 'agents',
};

export function provideAgentsUpdateOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_UPDATE_ORG_VARIABLE,
    'AGENTS_UPDATE_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
