import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_STATUS_CHECK_PROTECTION } from './repos-update-status-check-protection.token';
import type { ReposUpdateStatusCheckProtectionResponse } from './repos-update-status-check-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-status-check-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks',
  method: 'patch',
  tag: 'repos',
};

export function provideReposUpdateStatusCheckProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateStatusCheckProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_STATUS_CHECK_PROTECTION,
    'REPOS_UPDATE_STATUS_CHECK_PROTECTION',
    initialBehavior,
    _meta,
  );
}
