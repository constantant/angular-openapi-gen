import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_PAT_GRANT_REQUESTS } from './orgs-list-pat-grant-requests.token';
import type { OrgsListPatGrantRequestsResponse } from './orgs-list-pat-grant-requests.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-pat-grant-requests',
  path: '/orgs/{org}/personal-access-token-requests',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListPatGrantRequestsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListPatGrantRequestsResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_PAT_GRANT_REQUESTS,
    'ORGS_LIST_PAT_GRANT_REQUESTS',
    initialBehavior,
    _meta,
    options,
  );
}
