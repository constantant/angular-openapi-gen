import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_LIST_STARRED } from './gists-list-starred.token';
import type { GistsListStarredResponse } from './gists-list-starred.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/list-starred',
  path: '/gists/starred',
  method: 'get',
  tag: 'gists',
};

export function provideGistsListStarredMock(
  initialBehavior?: ProviderInitialBehavior<GistsListStarredResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_LIST_STARRED,
    'GISTS_LIST_STARRED',
    initialBehavior,
    _meta,
  );
}
