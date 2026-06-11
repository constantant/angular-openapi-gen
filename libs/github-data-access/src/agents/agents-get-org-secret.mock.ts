import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_GET_ORG_SECRET } from './agents-get-org-secret.token';
import type { AgentsGetOrgSecretResponse } from './agents-get-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/get-org-secret',
  path: '/orgs/{org}/agents/secrets/{secret_name}',
  method: 'get',
  tag: 'agents',
};

export function provideAgentsGetOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<AgentsGetOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_GET_ORG_SECRET,
    'AGENTS_GET_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
