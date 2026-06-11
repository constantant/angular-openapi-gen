import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_GET_RESTRICTIONS_FOR_AUTHENTICATED_USER } from './interactions-get-restrictions-for-authenticated-user.token';
import type { InteractionsGetRestrictionsForAuthenticatedUserResponse } from './interactions-get-restrictions-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'interactions/get-restrictions-for-authenticated-user',
  path: '/user/interaction-limits',
  method: 'get',
  tag: 'interactions',
};

export function provideInteractionsGetRestrictionsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<InteractionsGetRestrictionsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_GET_RESTRICTIONS_FOR_AUTHENTICATED_USER,
    'INTERACTIONS_GET_RESTRICTIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
