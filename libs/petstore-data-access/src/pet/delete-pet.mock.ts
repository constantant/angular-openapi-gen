import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { provideDeletePet } from './delete-pet.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'deletePet',
  path: '/pet/{petId}',
  method: 'delete',
  tag: 'pet',
};

export const DELETE_PET_MOCK: MockEndpoint<unknown> = {
  key: 'DELETE_PET',
  baseUrl: PETSTORE_BASE_URL,
  meta: _meta,
  provide: provideDeletePet,
};

export function provideDeletePetMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(DELETE_PET_MOCK, initialBehavior);
}
