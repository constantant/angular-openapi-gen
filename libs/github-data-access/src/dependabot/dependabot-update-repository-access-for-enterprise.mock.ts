import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ENTERPRISE } from './dependabot-update-repository-access-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/update-repository-access-for-enterprise',
  path: '/enterprises/{enterprise}/dependabot/repository-access',
  method: 'patch',
  tag: 'dependabot',
};

export function provideDependabotUpdateRepositoryAccessForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ENTERPRISE,
    'DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
