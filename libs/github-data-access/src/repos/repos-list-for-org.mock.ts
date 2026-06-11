import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_FOR_ORG } from './repos-list-for-org.token';
import type { ReposListForOrgResponse } from './repos-list-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-for-org',
  path: '/orgs/{org}/repos',
  method: 'get',
  tag: 'repos',
};

export function provideReposListForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ReposListForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_FOR_ORG,
    'REPOS_LIST_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
