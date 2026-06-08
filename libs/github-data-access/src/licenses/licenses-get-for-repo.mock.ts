import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { LICENSES_GET_FOR_REPO } from './licenses-get-for-repo.token';
import type { LicensesGetForRepoResponse } from './licenses-get-for-repo.token';

export function provideLicensesGetForRepoMock(
  initialBehavior?: ProviderInitialBehavior<LicensesGetForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    LICENSES_GET_FOR_REPO,
    'LICENSES_GET_FOR_REPO',
    initialBehavior,
  );
}
