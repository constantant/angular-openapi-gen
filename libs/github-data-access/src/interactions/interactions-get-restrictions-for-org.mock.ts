import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_GET_RESTRICTIONS_FOR_ORG } from './interactions-get-restrictions-for-org.token';
import type { InteractionsGetRestrictionsForOrgResponse } from './interactions-get-restrictions-for-org.token';

export function provideInteractionsGetRestrictionsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<InteractionsGetRestrictionsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_GET_RESTRICTIONS_FOR_ORG,
    'INTERACTIONS_GET_RESTRICTIONS_FOR_ORG',
    initialBehavior,
  );
}
