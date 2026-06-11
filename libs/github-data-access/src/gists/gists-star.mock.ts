import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_STAR } from './gists-star.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/star',
  path: '/gists/{gist_id}/star',
  method: 'put',
  tag: 'gists',
};

export function provideGistsStarMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(GISTS_STAR, 'GISTS_STAR', initialBehavior, _meta);
}
