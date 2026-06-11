import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO } from './actions-set-custom-oidc-sub-claim-for-repo.token';
import type { ActionsSetCustomOidcSubClaimForRepoResponse } from './actions-set-custom-oidc-sub-claim-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-custom-oidc-sub-claim-for-repo',
  path: '/repos/{owner}/{repo}/actions/oidc/customization/sub',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetCustomOidcSubClaimForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsSetCustomOidcSubClaimForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO,
    'ACTIONS_SET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
