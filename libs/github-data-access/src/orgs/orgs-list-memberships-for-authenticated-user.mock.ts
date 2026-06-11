import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_MEMBERSHIPS_FOR_AUTHENTICATED_USER } from './orgs-list-memberships-for-authenticated-user.token';
import type { OrgsListMembershipsForAuthenticatedUserResponse } from './orgs-list-memberships-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-memberships-for-authenticated-user',
  path: '/user/memberships/orgs',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListMembershipsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListMembershipsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_MEMBERSHIPS_FOR_AUTHENTICATED_USER,
    'ORGS_LIST_MEMBERSHIPS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
