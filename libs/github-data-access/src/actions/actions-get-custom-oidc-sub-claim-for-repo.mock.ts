import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO } from './actions-get-custom-oidc-sub-claim-for-repo.token';
import type { ActionsGetCustomOidcSubClaimForRepoResponse } from './actions-get-custom-oidc-sub-claim-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-custom-oidc-sub-claim-for-repo',
  path: '/repos/{owner}/{repo}/actions/oidc/customization/sub',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetCustomOidcSubClaimForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetCustomOidcSubClaimForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO,
    'ACTIONS_GET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
