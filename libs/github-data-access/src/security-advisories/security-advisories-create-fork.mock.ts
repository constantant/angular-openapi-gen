import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_CREATE_FORK } from './security-advisories-create-fork.token';
import type { SecurityAdvisoriesCreateForkResponse } from './security-advisories-create-fork.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'security-advisories/create-fork',
  path: '/repos/{owner}/{repo}/security-advisories/{ghsa_id}/forks',
  method: 'post',
  tag: 'security-advisories',
};

export function provideSecurityAdvisoriesCreateForkMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesCreateForkResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_CREATE_FORK,
    'SECURITY_ADVISORIES_CREATE_FORK',
    initialBehavior,
    _meta,
  );
}
