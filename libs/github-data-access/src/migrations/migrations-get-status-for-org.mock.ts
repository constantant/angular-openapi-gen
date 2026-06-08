import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_GET_STATUS_FOR_ORG } from './migrations-get-status-for-org.token';
import type { MigrationsGetStatusForOrgResponse } from './migrations-get-status-for-org.token';

export function provideMigrationsGetStatusForOrgMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsGetStatusForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_GET_STATUS_FOR_ORG,
    'MIGRATIONS_GET_STATUS_FOR_ORG',
    initialBehavior,
  );
}
