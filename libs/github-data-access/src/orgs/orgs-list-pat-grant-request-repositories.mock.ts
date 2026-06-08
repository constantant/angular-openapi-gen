import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_PAT_GRANT_REQUEST_REPOSITORIES } from './orgs-list-pat-grant-request-repositories.token';
import type { OrgsListPatGrantRequestRepositoriesResponse } from './orgs-list-pat-grant-request-repositories.token';

export function provideOrgsListPatGrantRequestRepositoriesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListPatGrantRequestRepositoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_PAT_GRANT_REQUEST_REPOSITORIES,
    'ORGS_LIST_PAT_GRANT_REQUEST_REPOSITORIES',
    initialBehavior,
  );
}
