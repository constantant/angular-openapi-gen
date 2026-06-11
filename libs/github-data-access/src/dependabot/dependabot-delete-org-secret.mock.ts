import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_DELETE_ORG_SECRET } from './dependabot-delete-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/delete-org-secret',
  path: '/orgs/{org}/dependabot/secrets/{secret_name}',
  method: 'delete',
  tag: 'dependabot',
};

export function provideDependabotDeleteOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_DELETE_ORG_SECRET,
    'DEPENDABOT_DELETE_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
