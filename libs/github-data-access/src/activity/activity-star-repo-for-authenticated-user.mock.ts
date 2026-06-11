import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_STAR_REPO_FOR_AUTHENTICATED_USER } from './activity-star-repo-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/star-repo-for-authenticated-user',
  path: '/user/starred/{owner}/{repo}',
  method: 'put',
  tag: 'activity',
};

export function provideActivityStarRepoForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_STAR_REPO_FOR_AUTHENTICATED_USER,
    'ACTIVITY_STAR_REPO_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
