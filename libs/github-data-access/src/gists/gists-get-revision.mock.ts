import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_GET_REVISION } from './gists-get-revision.token';
import type { GistsGetRevisionResponse } from './gists-get-revision.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/get-revision',
  path: '/gists/{gist_id}/{sha}',
  method: 'get',
  tag: 'gists',
};

export function provideGistsGetRevisionMock(
  initialBehavior?: ProviderInitialBehavior<GistsGetRevisionResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_GET_REVISION,
    'GISTS_GET_REVISION',
    initialBehavior,
    _meta,
  );
}
