import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_LIST_MATCHING_REFS } from './git-list-matching-refs.token';
import type { GitListMatchingRefsResponse } from './git-list-matching-refs.token';

export function provideGitListMatchingRefsMock(
  initialBehavior?: ProviderInitialBehavior<GitListMatchingRefsResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_LIST_MATCHING_REFS,
    'GIT_LIST_MATCHING_REFS',
    initialBehavior,
  );
}
