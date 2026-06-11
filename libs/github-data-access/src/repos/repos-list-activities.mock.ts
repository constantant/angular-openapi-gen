import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_ACTIVITIES } from './repos-list-activities.token';
import type { ReposListActivitiesResponse } from './repos-list-activities.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-activities',
  path: '/repos/{owner}/{repo}/activity',
  method: 'get',
  tag: 'repos',
};

export function provideReposListActivitiesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListActivitiesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_ACTIVITIES,
    'REPOS_LIST_ACTIVITIES',
    initialBehavior,
    _meta,
  );
}
