import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE } from './orgs-update.token';
import type { OrgsUpdateResponse } from './orgs-update.token';

export function provideOrgsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(ORGS_UPDATE, 'ORGS_UPDATE', initialBehavior);
}
