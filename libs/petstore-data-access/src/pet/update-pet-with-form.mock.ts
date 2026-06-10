import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { UPDATE_PET_WITH_FORM } from './update-pet-with-form.token';
import type { UpdatePetWithFormResponse } from './update-pet-with-form.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'updatePetWithForm',
  path: '/pet/{petId}',
  method: 'post',
  tag: 'pet',
};

export function provideUpdatePetWithFormMock(
  initialBehavior?: ProviderInitialBehavior<UpdatePetWithFormResponse>,
): FactoryProvider {
  return provideMockResource(
    UPDATE_PET_WITH_FORM,
    'UPDATE_PET_WITH_FORM',
    initialBehavior,
    _meta,
  );
}
