import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_GET_REPO_PUBLIC_KEY } from './dependabot-get-repo-public-key.token';
import type { DependabotGetRepoPublicKeyResponse } from './dependabot-get-repo-public-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/get-repo-public-key',
  path: '/repos/{owner}/{repo}/dependabot/secrets/public-key',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotGetRepoPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<DependabotGetRepoPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_GET_REPO_PUBLIC_KEY,
    'DEPENDABOT_GET_REPO_PUBLIC_KEY',
    initialBehavior,
    _meta,
  );
}
