import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_START_FOR_ORG } from './migrations-start-for-org.token';
import type { MigrationsStartForOrgResponse } from './migrations-start-for-org.token';

export function provideMigrationsStartForOrgMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsStartForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_START_FOR_ORG,
    'MIGRATIONS_START_FOR_ORG',
    initialBehavior,
  );
}
