import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_LIST_FOR_RELEASE } from './reactions-list-for-release.token';
import type { ReactionsListForReleaseResponse } from './reactions-list-for-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/list-for-release',
  path: '/repos/{owner}/{repo}/releases/{release_id}/reactions',
  method: 'get',
  tag: 'reactions',
};

export function provideReactionsListForReleaseMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsListForReleaseResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_LIST_FOR_RELEASE,
    'REACTIONS_LIST_FOR_RELEASE',
    initialBehavior,
    _meta,
  );
}
