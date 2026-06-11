import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_FOR_USER } from './orgs-list-for-user.token';
import type { OrgsListForUserResponse } from './orgs-list-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-for-user',
  path: '/users/{username}/orgs',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListForUserMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_FOR_USER,
    'ORGS_LIST_FOR_USER',
    initialBehavior,
    _meta,
  );
}
