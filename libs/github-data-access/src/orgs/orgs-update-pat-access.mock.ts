import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_PAT_ACCESS } from './orgs-update-pat-access.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/update-pat-access',
  path: '/orgs/{org}/personal-access-tokens/{pat_id}',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsUpdatePatAccessMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_PAT_ACCESS,
    'ORGS_UPDATE_PAT_ACCESS',
    initialBehavior,
    _meta,
  );
}
