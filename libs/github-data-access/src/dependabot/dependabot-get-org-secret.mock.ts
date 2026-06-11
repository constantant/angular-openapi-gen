import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_GET_ORG_SECRET } from './dependabot-get-org-secret.token';
import type { DependabotGetOrgSecretResponse } from './dependabot-get-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/get-org-secret',
  path: '/orgs/{org}/dependabot/secrets/{secret_name}',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotGetOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<DependabotGetOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_GET_ORG_SECRET,
    'DEPENDABOT_GET_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
