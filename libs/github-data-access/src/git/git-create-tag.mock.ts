import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_CREATE_TAG } from './git-create-tag.token';
import type { GitCreateTagResponse } from './git-create-tag.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/create-tag',
  path: '/repos/{owner}/{repo}/git/tags',
  method: 'post',
  tag: 'git',
};

export function provideGitCreateTagMock(
  initialBehavior?: ProviderInitialBehavior<GitCreateTagResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_CREATE_TAG,
    'GIT_CREATE_TAG',
    initialBehavior,
    _meta,
  );
}
