import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_PUBLIC_MEMBERS } from './orgs-list-public-members.token';
import type { OrgsListPublicMembersResponse } from './orgs-list-public-members.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-public-members',
  path: '/orgs/{org}/public_members',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListPublicMembersMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListPublicMembersResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_PUBLIC_MEMBERS,
    'ORGS_LIST_PUBLIC_MEMBERS',
    initialBehavior,
    _meta,
  );
}
