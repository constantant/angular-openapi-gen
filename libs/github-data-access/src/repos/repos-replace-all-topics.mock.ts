import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_REPLACE_ALL_TOPICS } from './repos-replace-all-topics.token';
import type { ReposReplaceAllTopicsResponse } from './repos-replace-all-topics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/replace-all-topics',
  path: '/repos/{owner}/{repo}/topics',
  method: 'put',
  tag: 'repos',
};

export function provideReposReplaceAllTopicsMock(
  initialBehavior?: ProviderInitialBehavior<ReposReplaceAllTopicsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REPLACE_ALL_TOPICS,
    'REPOS_REPLACE_ALL_TOPICS',
    initialBehavior,
    _meta,
  );
}
