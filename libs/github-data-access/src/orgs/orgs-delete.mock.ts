import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE } from './orgs-delete.token';
import type { OrgsDeleteResponse } from './orgs-delete.token';

export function provideOrgsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<OrgsDeleteResponse>,
): FactoryProvider {
  return provideMockResource(ORGS_DELETE, 'ORGS_DELETE', initialBehavior);
}
