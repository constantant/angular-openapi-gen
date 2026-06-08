import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_CREATE_OR_UPDATE_REPO_SECRET } from './agents-create-or-update-repo-secret.token';
import type { AgentsCreateOrUpdateRepoSecretResponse } from './agents-create-or-update-repo-secret.token';

export function provideAgentsCreateOrUpdateRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<AgentsCreateOrUpdateRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_CREATE_OR_UPDATE_REPO_SECRET,
    'AGENTS_CREATE_OR_UPDATE_REPO_SECRET',
    initialBehavior,
  );
}
