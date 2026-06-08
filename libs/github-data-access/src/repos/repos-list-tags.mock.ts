import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_TAGS } from './repos-list-tags.token';
import type { ReposListTagsResponse } from './repos-list-tags.token';

export function provideReposListTagsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListTagsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_TAGS,
    'REPOS_LIST_TAGS',
    initialBehavior,
  );
}
