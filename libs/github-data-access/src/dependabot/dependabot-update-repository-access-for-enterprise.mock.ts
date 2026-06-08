import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ENTERPRISE } from './dependabot-update-repository-access-for-enterprise.token';

export function provideDependabotUpdateRepositoryAccessForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ENTERPRISE,
    'DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ENTERPRISE',
    initialBehavior,
  );
}
