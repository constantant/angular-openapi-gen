import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_REPLACE_ALL_TOPICS } from './repos-replace-all-topics.token';
import type { ReposReplaceAllTopicsResponse } from './repos-replace-all-topics.token';

export function provideReposReplaceAllTopicsMock(
  initialBehavior?: ProviderInitialBehavior<ReposReplaceAllTopicsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REPLACE_ALL_TOPICS,
    'REPOS_REPLACE_ALL_TOPICS',
    initialBehavior,
  );
}
