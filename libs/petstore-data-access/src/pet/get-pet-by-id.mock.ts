import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GET_PET_BY_ID } from './get-pet-by-id.token';
import type { GetPetByIdResponse } from './get-pet-by-id.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'getPetById',
  path: '/pet/{petId}',
  method: 'get',
  tag: 'pet',
};

export function provideGetPetByIdMock(
  initialBehavior?: ProviderInitialBehavior<GetPetByIdResponse>,
): FactoryProvider {
  return provideMockResource(
    GET_PET_BY_ID,
    'GET_PET_BY_ID',
    initialBehavior,
    _meta,
  );
}
