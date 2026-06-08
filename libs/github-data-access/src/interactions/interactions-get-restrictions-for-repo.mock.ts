import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_GET_RESTRICTIONS_FOR_REPO } from './interactions-get-restrictions-for-repo.token';
import type { InteractionsGetRestrictionsForRepoResponse } from './interactions-get-restrictions-for-repo.token';

export function provideInteractionsGetRestrictionsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<InteractionsGetRestrictionsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_GET_RESTRICTIONS_FOR_REPO,
    'INTERACTIONS_GET_RESTRICTIONS_FOR_REPO',
    initialBehavior,
  );
}
