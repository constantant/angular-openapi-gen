import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetArtifactAndLogRetentionSettingsOrganizationBody =
  NonNullable<
    paths['/orgs/{org}/actions/permissions/artifact-and-log-retention']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsSetArtifactAndLogRetentionSettingsOrganizationBody
        | Signal<ActionsSetArtifactAndLogRetentionSettingsOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsSetArtifactAndLogRetentionSettingsOrganizationBody
          | Signal<ActionsSetArtifactAndLogRetentionSettingsOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/permissions/artifact-and-log-retention`,
          method: 'PUT',
          body,
        }));
    },
  });
