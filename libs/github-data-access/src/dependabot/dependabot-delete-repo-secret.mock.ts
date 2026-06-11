import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_DELETE_REPO_SECRET } from './dependabot-delete-repo-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/delete-repo-secret',
  path: '/repos/{owner}/{repo}/dependabot/secrets/{secret_name}',
  method: 'delete',
  tag: 'dependabot',
};

export function provideDependabotDeleteRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_DELETE_REPO_SECRET,
    'DEPENDABOT_DELETE_REPO_SECRET',
    initialBehavior,
    _meta,
  );
}
