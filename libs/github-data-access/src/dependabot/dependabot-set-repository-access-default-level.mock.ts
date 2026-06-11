import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_SET_REPOSITORY_ACCESS_DEFAULT_LEVEL } from './dependabot-set-repository-access-default-level.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/set-repository-access-default-level',
  path: '/orgs/{org}/dependabot/repository-access/default-level',
  method: 'put',
  tag: 'dependabot',
};

export function provideDependabotSetRepositoryAccessDefaultLevelMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_SET_REPOSITORY_ACCESS_DEFAULT_LEVEL,
    'DEPENDABOT_SET_REPOSITORY_ACCESS_DEFAULT_LEVEL',
    initialBehavior,
    _meta,
  );
}
