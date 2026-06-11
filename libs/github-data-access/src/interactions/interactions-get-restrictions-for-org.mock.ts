import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_GET_RESTRICTIONS_FOR_ORG } from './interactions-get-restrictions-for-org.token';
import type { InteractionsGetRestrictionsForOrgResponse } from './interactions-get-restrictions-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'interactions/get-restrictions-for-org',
  path: '/orgs/{org}/interaction-limits',
  method: 'get',
  tag: 'interactions',
};

export function provideInteractionsGetRestrictionsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<InteractionsGetRestrictionsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_GET_RESTRICTIONS_FOR_ORG,
    'INTERACTIONS_GET_RESTRICTIONS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
