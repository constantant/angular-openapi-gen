import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ADD_PET } from './add-pet.token';
import type { AddPetResponse } from './add-pet.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'addPet',
  path: '/pet',
  method: 'post',
  tag: 'pet',
};

export function provideAddPetMock(
  initialBehavior?: ProviderInitialBehavior<AddPetResponse>,
): FactoryProvider {
  return provideMockResource(ADD_PET, 'ADD_PET', initialBehavior, _meta);
}
