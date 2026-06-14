import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetArtifactAndLogRetentionSettingsRepositoryBody =
  NonNullable<
    paths['/repos/{owner}/{repo}/actions/permissions/artifact-and-log-retention']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      body:
        | ActionsSetArtifactAndLogRetentionSettingsRepositoryBody
        | Signal<ActionsSetArtifactAndLogRetentionSettingsRepositoryBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY');

export function provideActionsSetArtifactAndLogRetentionSettingsRepository(): FactoryProvider {
  return {
    provide: ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActionsSetArtifactAndLogRetentionSettingsRepositoryBody
          | Signal<ActionsSetArtifactAndLogRetentionSettingsRepositoryBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/permissions/artifact-and-log-retention`,
          method: 'PUT',
          body,
        }));
    },
  };
}
