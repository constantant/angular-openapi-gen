import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { LICENSES_GET_FOR_REPO } from './licenses-get-for-repo.token';
import type { LicensesGetForRepoResponse } from './licenses-get-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'licenses/get-for-repo',
  path: '/repos/{owner}/{repo}/license',
  method: 'get',
  tag: 'licenses',
};

export function provideLicensesGetForRepoMock(
  initialBehavior?: ProviderInitialBehavior<LicensesGetForRepoResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    LICENSES_GET_FOR_REPO,
    'LICENSES_GET_FOR_REPO',
    initialBehavior,
    _meta,
    options,
  );
}
