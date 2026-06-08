import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ALL_TOPICS } from './repos-get-all-topics.token';
import type { ReposGetAllTopicsResponse } from './repos-get-all-topics.token';

export function provideReposGetAllTopicsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAllTopicsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ALL_TOPICS,
    'REPOS_GET_ALL_TOPICS',
    initialBehavior,
  );
}
