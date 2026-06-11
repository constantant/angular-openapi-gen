import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { INTERACTIONS_REMOVE_RESTRICTIONS_FOR_AUTHENTICATED_USER } from './interactions-remove-restrictions-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'interactions/remove-restrictions-for-authenticated-user',
  path: '/user/interaction-limits',
  method: 'delete',
  tag: 'interactions',
};

export function provideInteractionsRemoveRestrictionsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    INTERACTIONS_REMOVE_RESTRICTIONS_FOR_AUTHENTICATED_USER,
    'INTERACTIONS_REMOVE_RESTRICTIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
