import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_DELETE_ORG_VARIABLE } from './agents-delete-org-variable.token';

export function provideAgentsDeleteOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_DELETE_ORG_VARIABLE,
    'AGENTS_DELETE_ORG_VARIABLE',
    initialBehavior,
  );
}
