import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE } from './repos-update.token';
import type { ReposUpdateResponse } from './repos-update.token';

export function provideReposUpdateMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateResponse>,
): FactoryProvider {
  return provideMockResource(REPOS_UPDATE, 'REPOS_UPDATE', initialBehavior);
}
