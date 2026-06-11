import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_FORK } from './gists-fork.token';
import type { GistsForkResponse } from './gists-fork.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/fork',
  path: '/gists/{gist_id}/forks',
  method: 'post',
  tag: 'gists',
};

export function provideGistsForkMock(
  initialBehavior?: ProviderInitialBehavior<GistsForkResponse>,
): FactoryProvider {
  return provideMockResource(GISTS_FORK, 'GISTS_FORK', initialBehavior, _meta);
}
