import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_UPDATE_REF } from './git-update-ref.token';
import type { GitUpdateRefResponse } from './git-update-ref.token';

export function provideGitUpdateRefMock(
  initialBehavior?: ProviderInitialBehavior<GitUpdateRefResponse>,
): FactoryProvider {
  return provideMockResource(GIT_UPDATE_REF, 'GIT_UPDATE_REF', initialBehavior);
}
