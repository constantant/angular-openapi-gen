import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_START_FOR_ORG } from './migrations-start-for-org.token';
import type { MigrationsStartForOrgResponse } from './migrations-start-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/start-for-org',
  path: '/orgs/{org}/migrations',
  method: 'post',
  tag: 'migrations',
};

export function provideMigrationsStartForOrgMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsStartForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_START_FOR_ORG,
    'MIGRATIONS_START_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
