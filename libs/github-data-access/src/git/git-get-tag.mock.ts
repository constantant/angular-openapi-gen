import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_GET_TAG } from './git-get-tag.token';
import type { GitGetTagResponse } from './git-get-tag.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/get-tag',
  path: '/repos/{owner}/{repo}/git/tags/{tag_sha}',
  method: 'get',
  tag: 'git',
};

export function provideGitGetTagMock(
  initialBehavior?: ProviderInitialBehavior<GitGetTagResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_GET_TAG,
    'GIT_GET_TAG',
    initialBehavior,
    _meta,
  );
}
