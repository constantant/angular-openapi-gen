import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE } from './orgs-delete.token';
import type { OrgsDeleteResponse } from './orgs-delete.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/delete',
  path: '/orgs/{org}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<OrgsDeleteResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE,
    'ORGS_DELETE',
    initialBehavior,
    _meta,
  );
}
