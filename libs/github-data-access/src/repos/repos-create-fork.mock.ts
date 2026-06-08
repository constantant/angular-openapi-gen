import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_FORK } from './repos-create-fork.token';
import type { ReposCreateForkResponse } from './repos-create-fork.token';

export function provideReposCreateForkMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateForkResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_FORK,
    'REPOS_CREATE_FORK',
    initialBehavior,
  );
}
