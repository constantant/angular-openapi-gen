import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_OR_UPDATE_REPO_SECRET } from './actions-create-or-update-repo-secret.token';
import type { ActionsCreateOrUpdateRepoSecretResponse } from './actions-create-or-update-repo-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/create-or-update-repo-secret',
  path: '/repos/{owner}/{repo}/actions/secrets/{secret_name}',
  method: 'put',
  tag: 'actions',
};

export function provideActionsCreateOrUpdateRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateOrUpdateRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_OR_UPDATE_REPO_SECRET,
    'ACTIONS_CREATE_OR_UPDATE_REPO_SECRET',
    initialBehavior,
    _meta,
  );
}
