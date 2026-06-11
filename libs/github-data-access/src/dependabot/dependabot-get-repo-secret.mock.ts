import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_GET_REPO_SECRET } from './dependabot-get-repo-secret.token';
import type { DependabotGetRepoSecretResponse } from './dependabot-get-repo-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/get-repo-secret',
  path: '/repos/{owner}/{repo}/dependabot/secrets/{secret_name}',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotGetRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<DependabotGetRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_GET_REPO_SECRET,
    'DEPENDABOT_GET_REPO_SECRET',
    initialBehavior,
    _meta,
  );
}
