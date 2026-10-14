import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import {
  provideUpdatePetWithForm,
  type UpdatePetWithFormResponse,
} from './update-pet-with-form.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'updatePetWithForm',
  path: '/pet/{petId}',
  method: 'post',
  tag: 'pet',
};

export const UPDATE_PET_WITH_FORM_MOCK: MockEndpoint<UpdatePetWithFormResponse> =
  {
    key: 'UPDATE_PET_WITH_FORM',
    baseUrl: PETSTORE_BASE_URL,
    meta: _meta,
    provide: provideUpdatePetWithForm,
  };

export function provideUpdatePetWithFormMock(
  initialBehavior?: MockEndpointBehavior<UpdatePetWithFormResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(UPDATE_PET_WITH_FORM_MOCK, initialBehavior);
}
