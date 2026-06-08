import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_SET_RESTRICTIONS_FOR_REPO } from './interactions-set-restrictions-for-repo.token';
import type { InteractionsSetRestrictionsForRepoResponse } from './interactions-set-restrictions-for-repo.token';

export function provideInteractionsSetRestrictionsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<InteractionsSetRestrictionsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_SET_RESTRICTIONS_FOR_REPO,
    'INTERACTIONS_SET_RESTRICTIONS_FOR_REPO',
    initialBehavior,
  );
}
