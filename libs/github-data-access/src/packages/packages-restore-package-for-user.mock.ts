import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PACKAGES_RESTORE_PACKAGE_FOR_USER } from './packages-restore-package-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'packages/restore-package-for-user',
  path: '/users/{username}/packages/{package_type}/{package_name}/restore',
  method: 'post',
  tag: 'packages',
};

export function providePackagesRestorePackageForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PACKAGES_RESTORE_PACKAGE_FOR_USER,
    'PACKAGES_RESTORE_PACKAGE_FOR_USER',
    initialBehavior,
    _meta,
  );
}
