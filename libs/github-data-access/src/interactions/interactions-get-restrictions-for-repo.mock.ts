import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_GET_RESTRICTIONS_FOR_REPO } from './interactions-get-restrictions-for-repo.token';
import type { InteractionsGetRestrictionsForRepoResponse } from './interactions-get-restrictions-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'interactions/get-restrictions-for-repo',
  path: '/repos/{owner}/{repo}/interaction-limits',
  method: 'get',
  tag: 'interactions',
};

export function provideInteractionsGetRestrictionsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<InteractionsGetRestrictionsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_GET_RESTRICTIONS_FOR_REPO,
    'INTERACTIONS_GET_RESTRICTIONS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
