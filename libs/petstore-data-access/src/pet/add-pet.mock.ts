import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ADD_PET } from './add-pet.token';
import type { AddPetResponse } from './add-pet.token';

export function provideAddPetMock(
  initialBehavior?: ProviderInitialBehavior<AddPetResponse>,
): FactoryProvider {
  return provideMockResource(ADD_PET, 'ADD_PET', initialBehavior);
}
