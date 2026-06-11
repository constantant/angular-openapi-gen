import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { LICENSES_GET_ALL_COMMONLY_USED } from './licenses-get-all-commonly-used.token';
import type { LicensesGetAllCommonlyUsedResponse } from './licenses-get-all-commonly-used.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'licenses/get-all-commonly-used',
  path: '/licenses',
  method: 'get',
  tag: 'licenses',
};

export function provideLicensesGetAllCommonlyUsedMock(
  initialBehavior?: ProviderInitialBehavior<LicensesGetAllCommonlyUsedResponse>,
): FactoryProvider {
  return provideMockResource(
    LICENSES_GET_ALL_COMMONLY_USED,
    'LICENSES_GET_ALL_COMMONLY_USED',
    initialBehavior,
    _meta,
  );
}
