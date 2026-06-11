import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { MIGRATIONS_SET_LFS_PREFERENCE } from './migrations-set-lfs-preference.token';
import type { MigrationsSetLfsPreferenceResponse } from './migrations-set-lfs-preference.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'migrations/set-lfs-preference',
  path: '/repos/{owner}/{repo}/import/lfs',
  method: 'patch',
  tag: 'migrations',
};

export function provideMigrationsSetLfsPreferenceMock(
  initialBehavior?: ProviderInitialBehavior<MigrationsSetLfsPreferenceResponse>,
): FactoryProvider {
  return provideMockResource(
    MIGRATIONS_SET_LFS_PREFERENCE,
    'MIGRATIONS_SET_LFS_PREFERENCE',
    initialBehavior,
    _meta,
  );
}
