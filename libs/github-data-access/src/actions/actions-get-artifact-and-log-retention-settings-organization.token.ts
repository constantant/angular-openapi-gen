import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetArtifactAndLogRetentionSettingsOrganizationResponse =
  paths['/orgs/{org}/actions/permissions/artifact-and-log-retention']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetArtifactAndLogRetentionSettingsOrganizationResponse>
    >
  >('ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION');

export function provideActionsGetArtifactAndLogRetentionSettingsOrganization(): FactoryProvider {
  return {
    provide: ACTIONS_GET_ARTIFACT_AND_LOG_RETENTION_SETTINGS_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetArtifactAndLogRetentionSettingsOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/permissions/artifact-and-log-retention`,
          }),
        );
    },
  };
}
