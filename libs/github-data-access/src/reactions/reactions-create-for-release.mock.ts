import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_CREATE_FOR_RELEASE } from './reactions-create-for-release.token';
import type { ReactionsCreateForReleaseResponse } from './reactions-create-for-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/create-for-release',
  path: '/repos/{owner}/{repo}/releases/{release_id}/reactions',
  method: 'post',
  tag: 'reactions',
};

export function provideReactionsCreateForReleaseMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsCreateForReleaseResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_CREATE_FOR_RELEASE,
    'REACTIONS_CREATE_FOR_RELEASE',
    initialBehavior,
    _meta,
  );
}
