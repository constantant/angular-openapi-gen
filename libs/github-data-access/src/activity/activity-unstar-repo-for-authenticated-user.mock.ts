import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_UNSTAR_REPO_FOR_AUTHENTICATED_USER } from './activity-unstar-repo-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/unstar-repo-for-authenticated-user',
  path: '/user/starred/{owner}/{repo}',
  method: 'delete',
  tag: 'activity',
};

export function provideActivityUnstarRepoForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_UNSTAR_REPO_FOR_AUTHENTICATED_USER,
    'ACTIVITY_UNSTAR_REPO_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
