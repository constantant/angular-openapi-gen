import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ORG } from './dependabot-update-repository-access-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/update-repository-access-for-org',
  path: '/orgs/{org}/dependabot/repository-access',
  method: 'patch',
  tag: 'dependabot',
};

export function provideDependabotUpdateRepositoryAccessForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ORG,
    'DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
