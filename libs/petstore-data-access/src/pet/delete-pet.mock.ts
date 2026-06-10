import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DELETE_PET } from './delete-pet.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'deletePet',
  path: '/pet/{petId}',
  method: 'delete',
  tag: 'pet',
};

export function provideDeletePetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(DELETE_PET, 'DELETE_PET', initialBehavior, _meta);
}
