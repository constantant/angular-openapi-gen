import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_UPDATE } from './gists-update.token';
import type { GistsUpdateResponse } from './gists-update.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/update',
  path: '/gists/{gist_id}',
  method: 'patch',
  tag: 'gists',
};

export function provideGistsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<GistsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_UPDATE,
    'GISTS_UPDATE',
    initialBehavior,
    _meta,
  );
}
