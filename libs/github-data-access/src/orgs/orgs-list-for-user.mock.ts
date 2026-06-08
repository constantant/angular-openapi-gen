import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_FOR_USER } from './orgs-list-for-user.token';
import type { OrgsListForUserResponse } from './orgs-list-for-user.token';

export function provideOrgsListForUserMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_FOR_USER,
    'ORGS_LIST_FOR_USER',
    initialBehavior,
  );
}
