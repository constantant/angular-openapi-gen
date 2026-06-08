import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_GET_TREE } from './git-get-tree.token';
import type { GitGetTreeResponse } from './git-get-tree.token';

export function provideGitGetTreeMock(
  initialBehavior?: ProviderInitialBehavior<GitGetTreeResponse>,
): FactoryProvider {
  return provideMockResource(GIT_GET_TREE, 'GIT_GET_TREE', initialBehavior);
}
