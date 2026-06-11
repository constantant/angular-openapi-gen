import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_LIST_FORKS } from './gists-list-forks.token';
import type { GistsListForksResponse } from './gists-list-forks.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/list-forks',
  path: '/gists/{gist_id}/forks',
  method: 'get',
  tag: 'gists',
};

export function provideGistsListForksMock(
  initialBehavior?: ProviderInitialBehavior<GistsListForksResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_LIST_FORKS,
    'GISTS_LIST_FORKS',
    initialBehavior,
    _meta,
  );
}
