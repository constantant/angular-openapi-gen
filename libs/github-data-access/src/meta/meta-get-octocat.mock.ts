import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { META_GET_OCTOCAT } from './meta-get-octocat.token';

export function provideMetaGetOctocatMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    META_GET_OCTOCAT,
    'META_GET_OCTOCAT',
    initialBehavior,
  );
}
