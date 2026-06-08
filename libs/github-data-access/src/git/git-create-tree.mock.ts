import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_CREATE_TREE } from './git-create-tree.token';
import type { GitCreateTreeResponse } from './git-create-tree.token';

export function provideGitCreateTreeMock(
  initialBehavior?: ProviderInitialBehavior<GitCreateTreeResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_CREATE_TREE,
    'GIT_CREATE_TREE',
    initialBehavior,
  );
}
