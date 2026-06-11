import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_DELETE_ORG_SECRET } from './codespaces-delete-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/delete-org-secret',
  path: '/orgs/{org}/codespaces/secrets/{secret_name}',
  method: 'delete',
  tag: 'codespaces',
};

export function provideCodespacesDeleteOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_DELETE_ORG_SECRET,
    'CODESPACES_DELETE_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
