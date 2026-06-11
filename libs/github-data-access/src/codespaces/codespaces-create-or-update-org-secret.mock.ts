import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_CREATE_OR_UPDATE_ORG_SECRET } from './codespaces-create-or-update-org-secret.token';
import type { CodespacesCreateOrUpdateOrgSecretResponse } from './codespaces-create-or-update-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/create-or-update-org-secret',
  path: '/orgs/{org}/codespaces/secrets/{secret_name}',
  method: 'put',
  tag: 'codespaces',
};

export function provideCodespacesCreateOrUpdateOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCreateOrUpdateOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CREATE_OR_UPDATE_ORG_SECRET,
    'CODESPACES_CREATE_OR_UPDATE_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
