import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_LIST_FOR_USER } from './gists-list-for-user.token';
import type { GistsListForUserResponse } from './gists-list-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/list-for-user',
  path: '/users/{username}/gists',
  method: 'get',
  tag: 'gists',
};

export function provideGistsListForUserMock(
  initialBehavior?: ProviderInitialBehavior<GistsListForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_LIST_FOR_USER,
    'GISTS_LIST_FOR_USER',
    initialBehavior,
    _meta,
  );
}
