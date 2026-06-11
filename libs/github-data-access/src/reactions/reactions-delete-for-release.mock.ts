import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_DELETE_FOR_RELEASE } from './reactions-delete-for-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/delete-for-release',
  path: '/repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}',
  method: 'delete',
  tag: 'reactions',
};

export function provideReactionsDeleteForReleaseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_DELETE_FOR_RELEASE,
    'REACTIONS_DELETE_FOR_RELEASE',
    initialBehavior,
    _meta,
  );
}
