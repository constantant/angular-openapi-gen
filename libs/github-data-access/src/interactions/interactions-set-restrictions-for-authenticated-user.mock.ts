import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_SET_RESTRICTIONS_FOR_AUTHENTICATED_USER } from './interactions-set-restrictions-for-authenticated-user.token';
import type { InteractionsSetRestrictionsForAuthenticatedUserResponse } from './interactions-set-restrictions-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'interactions/set-restrictions-for-authenticated-user',
  path: '/user/interaction-limits',
  method: 'put',
  tag: 'interactions',
};

export function provideInteractionsSetRestrictionsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<InteractionsSetRestrictionsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_SET_RESTRICTIONS_FOR_AUTHENTICATED_USER,
    'INTERACTIONS_SET_RESTRICTIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
