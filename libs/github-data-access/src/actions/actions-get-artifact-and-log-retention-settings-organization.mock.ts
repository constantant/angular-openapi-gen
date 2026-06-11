import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION } from './actions-get-artifact-and-log-retention-settings-organization.token';
import type { ActionsGetArtifactAndLogRetentionSettingsOrganizationResponse } from './actions-get-artifact-and-log-retention-settings-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-artifact-and-log-retention-settings-organization',
  path: '/orgs/{org}/actions/permissions/artifact-and-log-retention',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetArtifactAndLogRetentionSettingsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetArtifactAndLogRetentionSettingsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION,
    'ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
