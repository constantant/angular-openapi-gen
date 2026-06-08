import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_UPDATE_REPO_VARIABLE } from './agents-update-repo-variable.token';

export function provideAgentsUpdateRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_UPDATE_REPO_VARIABLE,
    'AGENTS_UPDATE_REPO_VARIABLE',
    initialBehavior,
  );
}
