import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO } from './actions-get-custom-oidc-sub-claim-for-repo.token';
import type { ActionsGetCustomOidcSubClaimForRepoResponse } from './actions-get-custom-oidc-sub-claim-for-repo.token';

export function provideActionsGetCustomOidcSubClaimForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetCustomOidcSubClaimForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO,
    'ACTIONS_GET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO',
    initialBehavior,
  );
}
