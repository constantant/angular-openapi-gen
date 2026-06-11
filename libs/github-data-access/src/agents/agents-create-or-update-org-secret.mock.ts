import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_CREATE_OR_UPDATE_ORG_SECRET } from './agents-create-or-update-org-secret.token';
import type { AgentsCreateOrUpdateOrgSecretResponse } from './agents-create-or-update-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/create-or-update-org-secret',
  path: '/orgs/{org}/agents/secrets/{secret_name}',
  method: 'put',
  tag: 'agents',
};

export function provideAgentsCreateOrUpdateOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<AgentsCreateOrUpdateOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_CREATE_OR_UPDATE_ORG_SECRET,
    'AGENTS_CREATE_OR_UPDATE_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
