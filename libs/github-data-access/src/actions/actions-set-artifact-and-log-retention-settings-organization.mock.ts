import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION } from './actions-set-artifact-and-log-retention-settings-organization.token';

export function provideActionsSetArtifactAndLogRetentionSettingsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION,
    'ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION',
    initialBehavior,
  );
}
