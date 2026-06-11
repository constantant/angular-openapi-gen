import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_REPOSITORY_ACCESS_FOR_ORG } from './dependabot-repository-access-for-org.token';
import type { DependabotRepositoryAccessForOrgResponse } from './dependabot-repository-access-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/repository-access-for-org',
  path: '/orgs/{org}/dependabot/repository-access',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotRepositoryAccessForOrgMock(
  initialBehavior?: ProviderInitialBehavior<DependabotRepositoryAccessForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_REPOSITORY_ACCESS_FOR_ORG,
    'DEPENDABOT_REPOSITORY_ACCESS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
