import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { FIND_PETS_BY_STATUS } from './find-pets-by-status.token';
import type { FindPetsByStatusResponse } from './find-pets-by-status.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'findPetsByStatus',
  path: '/pet/findByStatus',
  method: 'get',
  tag: 'pet',
};

export function provideFindPetsByStatusMock(
  initialBehavior?: ProviderInitialBehavior<FindPetsByStatusResponse>,
): FactoryProvider {
  return provideMockResource(
    FIND_PETS_BY_STATUS,
    'FIND_PETS_BY_STATUS',
    initialBehavior,
    _meta,
  );
}
