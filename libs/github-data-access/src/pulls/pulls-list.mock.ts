import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_LIST } from './pulls-list.token';
import type { PullsListResponse } from './pulls-list.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/list',
  path: '/repos/{owner}/{repo}/pulls',
  method: 'get',
  tag: 'pulls',
};

export function providePullsListMock(
  initialBehavior?: ProviderInitialBehavior<PullsListResponse>,
): FactoryProvider {
  return provideMockResource(PULLS_LIST, 'PULLS_LIST', initialBehavior, _meta);
}
