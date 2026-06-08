import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_DELETE_ORG_SECRET } from './dependabot-delete-org-secret.token';

export function provideDependabotDeleteOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_DELETE_ORG_SECRET,
    'DEPENDABOT_DELETE_ORG_SECRET',
    initialBehavior,
  );
}
