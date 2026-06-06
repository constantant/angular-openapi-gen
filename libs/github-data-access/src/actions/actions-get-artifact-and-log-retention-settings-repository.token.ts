import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetArtifactAndLogRetentionSettingsRepositoryResponse =
  paths['/repos/{owner}/{repo}/actions/permissions/artifact-and-log-retention']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetArtifactAndLogRetentionSettingsRepositoryResponse>
    >
  >('ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_REPOSITORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsGetArtifactAndLogRetentionSettingsRepositoryResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/actions/permissions/artifact-and-log-retention`,
          }),
        );
    },
  });
