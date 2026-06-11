import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_ORG_SECRET } from './codespaces-get-org-secret.token';
import type { CodespacesGetOrgSecretResponse } from './codespaces-get-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/get-org-secret',
  path: '/orgs/{org}/codespaces/secrets/{secret_name}',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesGetOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_ORG_SECRET,
    'CODESPACES_GET_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
