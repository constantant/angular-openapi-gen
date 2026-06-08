import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_CREATE_TAG } from './git-create-tag.token';
import type { GitCreateTagResponse } from './git-create-tag.token';

export function provideGitCreateTagMock(
  initialBehavior?: ProviderInitialBehavior<GitCreateTagResponse>,
): FactoryProvider {
  return provideMockResource(GIT_CREATE_TAG, 'GIT_CREATE_TAG', initialBehavior);
}
