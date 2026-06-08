import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_LIST_ORG_SECRETS } from './dependabot-list-org-secrets.token';
import type { DependabotListOrgSecretsResponse } from './dependabot-list-org-secrets.token';

export function provideDependabotListOrgSecretsMock(
  initialBehavior?: ProviderInitialBehavior<DependabotListOrgSecretsResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_LIST_ORG_SECRETS,
    'DEPENDABOT_LIST_ORG_SECRETS',
    initialBehavior,
  );
}
