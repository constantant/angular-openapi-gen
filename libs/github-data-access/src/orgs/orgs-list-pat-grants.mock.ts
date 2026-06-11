import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_PAT_GRANTS } from './orgs-list-pat-grants.token';
import type { OrgsListPatGrantsResponse } from './orgs-list-pat-grants.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-pat-grants',
  path: '/orgs/{org}/personal-access-tokens',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListPatGrantsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListPatGrantsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_PAT_GRANTS,
    'ORGS_LIST_PAT_GRANTS',
    initialBehavior,
    _meta,
  );
}
