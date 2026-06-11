import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_MEMBERS } from './orgs-list-members.token';
import type { OrgsListMembersResponse } from './orgs-list-members.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-members',
  path: '/orgs/{org}/members',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListMembersMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListMembersResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_MEMBERS,
    'ORGS_LIST_MEMBERS',
    initialBehavior,
    _meta,
  );
}
