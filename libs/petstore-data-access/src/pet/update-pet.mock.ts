import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { UPDATE_PET } from './update-pet.token';
import type { UpdatePetResponse } from './update-pet.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'updatePet',
  path: '/pet',
  method: 'put',
  tag: 'pet',
};

export function provideUpdatePetMock(
  initialBehavior?: ProviderInitialBehavior<UpdatePetResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    UPDATE_PET,
    'UPDATE_PET',
    initialBehavior,
    _meta,
    options,
  );
}
