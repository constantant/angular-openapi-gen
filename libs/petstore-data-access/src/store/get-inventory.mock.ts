import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GET_INVENTORY } from './get-inventory.token';
import type { GetInventoryResponse } from './get-inventory.token';

export function provideGetInventoryMock(
  initialBehavior?: ProviderInitialBehavior<GetInventoryResponse>,
): FactoryProvider {
  return provideMockResource(GET_INVENTORY, 'GET_INVENTORY', initialBehavior);
}
