import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY } from './actions-set-artifact-and-log-retention-settings-repository.token';

export function provideActionsSetArtifactAndLogRetentionSettingsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY,
    'ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY',
    initialBehavior,
  );
}
