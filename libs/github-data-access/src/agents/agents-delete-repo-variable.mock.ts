import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_DELETE_REPO_VARIABLE } from './agents-delete-repo-variable.token';

export function provideAgentsDeleteRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_DELETE_REPO_VARIABLE,
    'AGENTS_DELETE_REPO_VARIABLE',
    initialBehavior,
  );
}
