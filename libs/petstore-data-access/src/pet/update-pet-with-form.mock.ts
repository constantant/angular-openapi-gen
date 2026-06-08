import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { UPDATE_PET_WITH_FORM } from './update-pet-with-form.token';
import type { UpdatePetWithFormResponse } from './update-pet-with-form.token';

export function provideUpdatePetWithFormMock(
  initialBehavior?: ProviderInitialBehavior<UpdatePetWithFormResponse>,
): FactoryProvider {
  return provideMockResource(
    UPDATE_PET_WITH_FORM,
    'UPDATE_PET_WITH_FORM',
    initialBehavior,
  );
}
