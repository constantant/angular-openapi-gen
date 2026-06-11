import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_REPOSITORY_ACCESS_FOR_ENTERPRISE } from './dependabot-repository-access-for-enterprise.token';
import type { DependabotRepositoryAccessForEnterpriseResponse } from './dependabot-repository-access-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/repository-access-for-enterprise',
  path: '/enterprises/{enterprise}/dependabot/repository-access',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotRepositoryAccessForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<DependabotRepositoryAccessForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_REPOSITORY_ACCESS_FOR_ENTERPRISE,
    'DEPENDABOT_REPOSITORY_ACCESS_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
