import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_PAT_GRANT_REQUESTS } from './orgs-list-pat-grant-requests.token';
import type { OrgsListPatGrantRequestsResponse } from './orgs-list-pat-grant-requests.token';

export function provideOrgsListPatGrantRequestsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListPatGrantRequestsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_PAT_GRANT_REQUESTS,
    'ORGS_LIST_PAT_GRANT_REQUESTS',
    initialBehavior,
  );
}
