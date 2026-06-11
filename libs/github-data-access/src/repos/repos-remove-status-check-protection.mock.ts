import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_REMOVE_STATUS_CHECK_PROTECTION } from './repos-remove-status-check-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/remove-status-check-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks',
  method: 'delete',
  tag: 'repos',
};

export function provideReposRemoveStatusCheckProtectionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REMOVE_STATUS_CHECK_PROTECTION,
    'REPOS_REMOVE_STATUS_CHECK_PROTECTION',
    initialBehavior,
    _meta,
  );
}
