import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_LIST_FOR_ORG } from './migrations-list-for-org.token';
import type { MigrationsListForOrgResponse } from './migrations-list-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/list-for-org',
  path: '/orgs/{org}/migrations',
  method: 'get',
  tag: 'migrations',
};

export function provideMigrationsListForOrgMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsListForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_LIST_FOR_ORG,
    'MIGRATIONS_LIST_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
