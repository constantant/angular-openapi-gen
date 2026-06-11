import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_GET } from './pulls-get.token';
import type { PullsGetResponse } from './pulls-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/get',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}',
  method: 'get',
  tag: 'pulls',
};

export function providePullsGetMock(
  initialBehavior?: ProviderInitialBehavior<PullsGetResponse>,
): FactoryProvider {
  return provideMockResource(PULLS_GET, 'PULLS_GET', initialBehavior, _meta);
}
