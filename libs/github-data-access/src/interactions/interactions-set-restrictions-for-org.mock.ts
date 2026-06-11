import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_SET_RESTRICTIONS_FOR_ORG } from './interactions-set-restrictions-for-org.token';
import type { InteractionsSetRestrictionsForOrgResponse } from './interactions-set-restrictions-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'interactions/set-restrictions-for-org',
  path: '/orgs/{org}/interaction-limits',
  method: 'put',
  tag: 'interactions',
};

export function provideInteractionsSetRestrictionsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<InteractionsSetRestrictionsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_SET_RESTRICTIONS_FOR_ORG,
    'INTERACTIONS_SET_RESTRICTIONS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
