import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_PAT_GRANT_REQUEST_REPOSITORIES } from './orgs-list-pat-grant-request-repositories.token';
import type { OrgsListPatGrantRequestRepositoriesResponse } from './orgs-list-pat-grant-request-repositories.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-pat-grant-request-repositories',
  path: '/orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListPatGrantRequestRepositoriesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListPatGrantRequestRepositoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_PAT_GRANT_REQUEST_REPOSITORIES,
    'ORGS_LIST_PAT_GRANT_REQUEST_REPOSITORIES',
    initialBehavior,
    _meta,
  );
}
