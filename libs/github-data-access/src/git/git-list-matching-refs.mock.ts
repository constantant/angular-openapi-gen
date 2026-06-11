import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_LIST_MATCHING_REFS } from './git-list-matching-refs.token';
import type { GitListMatchingRefsResponse } from './git-list-matching-refs.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/list-matching-refs',
  path: '/repos/{owner}/{repo}/git/matching-refs/{ref}',
  method: 'get',
  tag: 'git',
};

export function provideGitListMatchingRefsMock(
  initialBehavior?: ProviderInitialBehavior<GitListMatchingRefsResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_LIST_MATCHING_REFS,
    'GIT_LIST_MATCHING_REFS',
    initialBehavior,
    _meta,
  );
}
