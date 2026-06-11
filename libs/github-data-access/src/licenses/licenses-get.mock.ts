import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { LICENSES_GET } from './licenses-get.token';
import type { LicensesGetResponse } from './licenses-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'licenses/get',
  path: '/licenses/{license}',
  method: 'get',
  tag: 'licenses',
};

export function provideLicensesGetMock(
  initialBehavior?: ProviderInitialBehavior<LicensesGetResponse>,
): FactoryProvider {
  return provideMockResource(
    LICENSES_GET,
    'LICENSES_GET',
    initialBehavior,
    _meta,
  );
}
