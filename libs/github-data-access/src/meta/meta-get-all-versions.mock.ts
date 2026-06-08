import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { META_GET_ALL_VERSIONS } from './meta-get-all-versions.token';
import type { MetaGetAllVersionsResponse } from './meta-get-all-versions.token';

export function provideMetaGetAllVersionsMock(
  initialBehavior?: ProviderInitialBehavior<MetaGetAllVersionsResponse>,
): FactoryProvider {
  return provideMockResource(
    META_GET_ALL_VERSIONS,
    'META_GET_ALL_VERSIONS',
    initialBehavior,
  );
}
