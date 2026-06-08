import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODES_OF_CONDUCT_GET_ALL_CODES_OF_CONDUCT } from './codes-of-conduct-get-all-codes-of-conduct.token';
import type { CodesOfConductGetAllCodesOfConductResponse } from './codes-of-conduct-get-all-codes-of-conduct.token';

export function provideCodesOfConductGetAllCodesOfConductMock(
  initialBehavior?: ProviderInitialBehavior<CodesOfConductGetAllCodesOfConductResponse>,
): FactoryProvider {
  return provideMockResource(
    CODES_OF_CONDUCT_GET_ALL_CODES_OF_CONDUCT,
    'CODES_OF_CONDUCT_GET_ALL_CODES_OF_CONDUCT',
    initialBehavior,
  );
}
