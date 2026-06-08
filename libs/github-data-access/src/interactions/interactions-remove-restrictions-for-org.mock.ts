import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_REMOVE_RESTRICTIONS_FOR_ORG } from './interactions-remove-restrictions-for-org.token';

export function provideInteractionsRemoveRestrictionsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_REMOVE_RESTRICTIONS_FOR_ORG,
    'INTERACTIONS_REMOVE_RESTRICTIONS_FOR_ORG',
    initialBehavior,
  );
}
