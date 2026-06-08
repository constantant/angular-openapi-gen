import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_SET_LFS_PREFERENCE } from './migrations-set-lfs-preference.token';
import type { MigrationsSetLfsPreferenceResponse } from './migrations-set-lfs-preference.token';

export function provideMigrationsSetLfsPreferenceMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsSetLfsPreferenceResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_SET_LFS_PREFERENCE,
    'MIGRATIONS_SET_LFS_PREFERENCE',
    initialBehavior,
  );
}
