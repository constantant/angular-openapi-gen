import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CODEOWNERS_ERRORS } from './repos-codeowners-errors.token';
import type { ReposCodeownersErrorsResponse } from './repos-codeowners-errors.token';

export function provideReposCodeownersErrorsMock(
  initialBehavior?: ProviderInitialBehavior<ReposCodeownersErrorsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CODEOWNERS_ERRORS,
    'REPOS_CODEOWNERS_ERRORS',
    initialBehavior,
  );
}
