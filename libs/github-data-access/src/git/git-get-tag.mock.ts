import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_GET_TAG } from './git-get-tag.token';
import type { GitGetTagResponse } from './git-get-tag.token';

export function provideGitGetTagMock(
  initialBehavior?: ProviderInitialBehavior<GitGetTagResponse>,
): FactoryProvider {
  return provideMockResource(GIT_GET_TAG, 'GIT_GET_TAG', initialBehavior);
}
