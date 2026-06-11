import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_REPO } from './actions-create-registration-token-for-repo.token';
import type { ActionsCreateRegistrationTokenForRepoResponse } from './actions-create-registration-token-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/create-registration-token-for-repo',
  path: '/repos/{owner}/{repo}/actions/runners/registration-token',
  method: 'post',
  tag: 'actions',
};

export function provideActionsCreateRegistrationTokenForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateRegistrationTokenForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_REPO,
    'ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
