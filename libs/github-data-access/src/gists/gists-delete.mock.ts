import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_DELETE } from './gists-delete.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/delete',
  path: '/gists/{gist_id}',
  method: 'delete',
  tag: 'gists',
};

export function provideGistsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    GISTS_DELETE,
    'GISTS_DELETE',
    initialBehavior,
    _meta,
  );
}
