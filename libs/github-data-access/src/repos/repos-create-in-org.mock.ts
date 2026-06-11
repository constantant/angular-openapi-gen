import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_IN_ORG } from './repos-create-in-org.token';
import type { ReposCreateInOrgResponse } from './repos-create-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-in-org',
  path: '/orgs/{org}/repos',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateInOrgMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_IN_ORG,
    'REPOS_CREATE_IN_ORG',
    initialBehavior,
    _meta,
  );
}
