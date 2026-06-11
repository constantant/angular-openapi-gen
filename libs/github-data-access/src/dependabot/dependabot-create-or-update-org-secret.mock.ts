import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_CREATE_OR_UPDATE_ORG_SECRET } from './dependabot-create-or-update-org-secret.token';
import type { DependabotCreateOrUpdateOrgSecretResponse } from './dependabot-create-or-update-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/create-or-update-org-secret',
  path: '/orgs/{org}/dependabot/secrets/{secret_name}',
  method: 'put',
  tag: 'dependabot',
};

export function provideDependabotCreateOrUpdateOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<DependabotCreateOrUpdateOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_CREATE_OR_UPDATE_ORG_SECRET,
    'DEPENDABOT_CREATE_OR_UPDATE_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
