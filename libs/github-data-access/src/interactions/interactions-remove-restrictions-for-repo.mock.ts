import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_REMOVE_RESTRICTIONS_FOR_REPO } from './interactions-remove-restrictions-for-repo.token';

export function provideInteractionsRemoveRestrictionsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_REMOVE_RESTRICTIONS_FOR_REPO,
    'INTERACTIONS_REMOVE_RESTRICTIONS_FOR_REPO',
    initialBehavior,
  );
}
