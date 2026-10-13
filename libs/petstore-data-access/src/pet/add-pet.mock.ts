import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { provideAddPet, type AddPetResponse } from './add-pet.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'addPet',
  path: '/pet',
  method: 'post',
  tag: 'pet',
};

export const ADD_PET_MOCK: MockEndpoint<AddPetResponse> = {
  key: 'ADD_PET',
  baseUrl: PETSTORE_BASE_URL,
  meta: _meta,
  provide: provideAddPet,
};

export function provideAddPetMock(
  initialBehavior?: MockEndpointBehavior<AddPetResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(ADD_PET_MOCK, initialBehavior);
}
