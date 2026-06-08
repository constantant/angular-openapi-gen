import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_ACTIVITIES } from './repos-list-activities.token';
import type { ReposListActivitiesResponse } from './repos-list-activities.token';

export function provideReposListActivitiesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListActivitiesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_ACTIVITIES,
    'REPOS_LIST_ACTIVITIES',
    initialBehavior,
  );
}
