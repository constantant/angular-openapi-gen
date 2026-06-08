import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODES_OF_CONDUCT_GET_CONDUCT_CODE } from './codes-of-conduct-get-conduct-code.token';
import type { CodesOfConductGetConductCodeResponse } from './codes-of-conduct-get-conduct-code.token';

export function provideCodesOfConductGetConductCodeMock(
  initialBehavior?: ProviderInitialBehavior<CodesOfConductGetConductCodeResponse>,
): FactoryProvider {
  return provideMockResource(
    CODES_OF_CONDUCT_GET_CONDUCT_CODE,
    'CODES_OF_CONDUCT_GET_CONDUCT_CODE',
    initialBehavior,
  );
}
