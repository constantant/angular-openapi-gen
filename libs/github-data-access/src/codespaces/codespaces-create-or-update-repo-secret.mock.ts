import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_CREATE_OR_UPDATE_REPO_SECRET } from './codespaces-create-or-update-repo-secret.token';
import type { CodespacesCreateOrUpdateRepoSecretResponse } from './codespaces-create-or-update-repo-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/create-or-update-repo-secret',
  path: '/repos/{owner}/{repo}/codespaces/secrets/{secret_name}',
  method: 'put',
  tag: 'codespaces',
};

export function provideCodespacesCreateOrUpdateRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCreateOrUpdateRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CREATE_OR_UPDATE_REPO_SECRET,
    'CODESPACES_CREATE_OR_UPDATE_REPO_SECRET',
    initialBehavior,
    _meta,
  );
}
