import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_REMOVE_RESTRICTIONS_FOR_ORG } from './interactions-remove-restrictions-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'interactions/remove-restrictions-for-org',
  path: '/orgs/{org}/interaction-limits',
  method: 'delete',
  tag: 'interactions',
};

export function provideInteractionsRemoveRestrictionsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_REMOVE_RESTRICTIONS_FOR_ORG,
    'INTERACTIONS_REMOVE_RESTRICTIONS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
