import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_DELETE_ORG_SECRET } from './agents-delete-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/delete-org-secret',
  path: '/orgs/{org}/agents/secrets/{secret_name}',
  method: 'delete',
  tag: 'agents',
};

export function provideAgentsDeleteOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_DELETE_ORG_SECRET,
    'AGENTS_DELETE_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
