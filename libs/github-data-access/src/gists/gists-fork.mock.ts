import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_FORK } from './gists-fork.token';
import type { GistsForkResponse } from './gists-fork.token';

export function provideGistsForkMock(
  initialBehavior?: ProviderInitialBehavior<GistsForkResponse>,
): FactoryProvider {
  return provideMockResource(GISTS_FORK, 'GISTS_FORK', initialBehavior);
}
