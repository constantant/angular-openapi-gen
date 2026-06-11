import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_LIST_REPO_SECRETS } from './dependabot-list-repo-secrets.token';
import type { DependabotListRepoSecretsResponse } from './dependabot-list-repo-secrets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/list-repo-secrets',
  path: '/repos/{owner}/{repo}/dependabot/secrets',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotListRepoSecretsMock(
  initialBehavior?: ProviderInitialBehavior<DependabotListRepoSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_LIST_REPO_SECRETS,
    'DEPENDABOT_LIST_REPO_SECRETS',
    initialBehavior,
    _meta,
  );
}
