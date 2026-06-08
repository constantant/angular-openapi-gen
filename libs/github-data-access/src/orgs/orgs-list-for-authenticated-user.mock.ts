import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_FOR_AUTHENTICATED_USER } from './orgs-list-for-authenticated-user.token';
import type { OrgsListForAuthenticatedUserResponse } from './orgs-list-for-authenticated-user.token';

export function provideOrgsListForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_FOR_AUTHENTICATED_USER,
    'ORGS_LIST_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
