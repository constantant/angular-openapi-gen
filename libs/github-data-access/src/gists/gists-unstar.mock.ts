import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_UNSTAR } from './gists-unstar.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/unstar',
  path: '/gists/{gist_id}/star',
  method: 'delete',
  tag: 'gists',
};

export function provideGistsUnstarMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    GISTS_UNSTAR,
    'GISTS_UNSTAR',
    initialBehavior,
    _meta,
  );
}
