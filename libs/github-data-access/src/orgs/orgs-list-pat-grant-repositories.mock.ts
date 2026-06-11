import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_PAT_GRANT_REPOSITORIES } from './orgs-list-pat-grant-repositories.token';
import type { OrgsListPatGrantRepositoriesResponse } from './orgs-list-pat-grant-repositories.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-pat-grant-repositories',
  path: '/orgs/{org}/personal-access-tokens/{pat_id}/repositories',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListPatGrantRepositoriesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListPatGrantRepositoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_PAT_GRANT_REPOSITORIES,
    'ORGS_LIST_PAT_GRANT_REPOSITORIES',
    initialBehavior,
    _meta,
  );
}
