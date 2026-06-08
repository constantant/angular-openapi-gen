import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO } from './actions-set-custom-oidc-sub-claim-for-repo.token';
import type { ActionsSetCustomOidcSubClaimForRepoResponse } from './actions-set-custom-oidc-sub-claim-for-repo.token';

export function provideActionsSetCustomOidcSubClaimForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsSetCustomOidcSubClaimForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO,
    'ACTIONS_SET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO',
    initialBehavior,
  );
}
