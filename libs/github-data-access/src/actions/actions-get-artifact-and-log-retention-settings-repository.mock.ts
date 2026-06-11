import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY } from './actions-get-artifact-and-log-retention-settings-repository.token';
import type { ActionsGetArtifactAndLogRetentionSettingsRepositoryResponse } from './actions-get-artifact-and-log-retention-settings-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-artifact-and-log-retention-settings-repository',
  path: '/repos/{owner}/{repo}/actions/permissions/artifact-and-log-retention',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetArtifactAndLogRetentionSettingsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetArtifactAndLogRetentionSettingsRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY,
    'ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
