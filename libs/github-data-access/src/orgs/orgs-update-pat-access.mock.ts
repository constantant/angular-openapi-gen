import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_PAT_ACCESS } from './orgs-update-pat-access.token';

export function provideOrgsUpdatePatAccessMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_PAT_ACCESS,
    'ORGS_UPDATE_PAT_ACCESS',
    initialBehavior,
  );
}
