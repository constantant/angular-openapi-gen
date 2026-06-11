import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODES_OF_CONDUCT_GET_CONDUCT_CODE } from './codes-of-conduct-get-conduct-code.token';
import type { CodesOfConductGetConductCodeResponse } from './codes-of-conduct-get-conduct-code.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codes-of-conduct/get-conduct-code',
  path: '/codes_of_conduct/{key}',
  method: 'get',
  tag: 'codes-of-conduct',
};

export function provideCodesOfConductGetConductCodeMock(
  initialBehavior?: ProviderInitialBehavior<CodesOfConductGetConductCodeResponse>,
): FactoryProvider {
  return provideMockResource(
    CODES_OF_CONDUCT_GET_CONDUCT_CODE,
    'CODES_OF_CONDUCT_GET_CONDUCT_CODE',
    initialBehavior,
    _meta,
  );
}
