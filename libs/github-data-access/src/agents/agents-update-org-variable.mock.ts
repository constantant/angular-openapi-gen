import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_UPDATE_ORG_VARIABLE } from './agents-update-org-variable.token';

export function provideAgentsUpdateOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_UPDATE_ORG_VARIABLE,
    'AGENTS_UPDATE_ORG_VARIABLE',
    initialBehavior,
  );
}
