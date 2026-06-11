import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_CHECK_IS_STARRED } from './gists-check-is-starred.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/check-is-starred',
  path: '/gists/{gist_id}/star',
  method: 'get',
  tag: 'gists',
};

export function provideGistsCheckIsStarredMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    GISTS_CHECK_IS_STARRED,
    'GISTS_CHECK_IS_STARRED',
    initialBehavior,
    _meta,
  );
}
