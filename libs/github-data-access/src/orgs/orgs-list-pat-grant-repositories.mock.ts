import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_PAT_GRANT_REPOSITORIES } from './orgs-list-pat-grant-repositories.token';
import type { OrgsListPatGrantRepositoriesResponse } from './orgs-list-pat-grant-repositories.token';

export function provideOrgsListPatGrantRepositoriesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListPatGrantRepositoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_PAT_GRANT_REPOSITORIES,
    'ORGS_LIST_PAT_GRANT_REPOSITORIES',
    initialBehavior,
  );
}
