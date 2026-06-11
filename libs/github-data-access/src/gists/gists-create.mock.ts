import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_CREATE } from './gists-create.token';
import type { GistsCreateResponse } from './gists-create.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/create',
  path: '/gists',
  method: 'post',
  tag: 'gists',
};

export function provideGistsCreateMock(
  initialBehavior?: ProviderInitialBehavior<GistsCreateResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_CREATE,
    'GISTS_CREATE',
    initialBehavior,
    _meta,
  );
}
