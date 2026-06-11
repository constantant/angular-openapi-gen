import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_CREATE_OR_UPDATE_REPO_SECRET } from './dependabot-create-or-update-repo-secret.token';
import type { DependabotCreateOrUpdateRepoSecretResponse } from './dependabot-create-or-update-repo-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/create-or-update-repo-secret',
  path: '/repos/{owner}/{repo}/dependabot/secrets/{secret_name}',
  method: 'put',
  tag: 'dependabot',
};

export function provideDependabotCreateOrUpdateRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<DependabotCreateOrUpdateRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_CREATE_OR_UPDATE_REPO_SECRET,
    'DEPENDABOT_CREATE_OR_UPDATE_REPO_SECRET',
    initialBehavior,
    _meta,
  );
}
