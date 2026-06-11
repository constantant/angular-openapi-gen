import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_REMOVE_RESTRICTIONS_FOR_REPO } from './interactions-remove-restrictions-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'interactions/remove-restrictions-for-repo',
  path: '/repos/{owner}/{repo}/interaction-limits',
  method: 'delete',
  tag: 'interactions',
};

export function provideInteractionsRemoveRestrictionsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_REMOVE_RESTRICTIONS_FOR_REPO,
    'INTERACTIONS_REMOVE_RESTRICTIONS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
