import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { provideUpdatePet, type UpdatePetResponse } from './update-pet.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'updatePet',
  path: '/pet',
  method: 'put',
  tag: 'pet',
};

export const UPDATE_PET_MOCK: MockEndpoint<UpdatePetResponse> = {
  key: 'UPDATE_PET',
  baseUrl: PETSTORE_BASE_URL,
  meta: _meta,
  provide: provideUpdatePet,
};

export function provideUpdatePetMock(
  initialBehavior?: MockEndpointBehavior<UpdatePetResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(UPDATE_PET_MOCK, initialBehavior);
}
