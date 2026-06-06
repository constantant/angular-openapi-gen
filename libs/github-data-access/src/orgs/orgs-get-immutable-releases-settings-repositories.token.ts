import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetImmutableReleasesSettingsRepositoriesParams =
  paths['/orgs/{org}/settings/immutable-releases/repositories']['get']['parameters']['query'];

export type OrgsGetImmutableReleasesSettingsRepositoriesResponse =
  paths['/orgs/{org}/settings/immutable-releases/repositories']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET_IMMUTABLE_RELEASES_SETTINGS_REPOSITORIES =
  new InjectionToken<
    (
      org: string,
      params?:
        | OrgsGetImmutableReleasesSettingsRepositoriesParams
        | (() =>
            | OrgsGetImmutableReleasesSettingsRepositoriesParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<OrgsGetImmutableReleasesSettingsRepositoriesResponse>
    >
  >('ORGS_GET_IMMUTABLE_RELEASES_SETTINGS_REPOSITORIES', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsGetImmutableReleasesSettingsRepositoriesParams
          | (() =>
              | OrgsGetImmutableReleasesSettingsRepositoriesParams
              | undefined),
      ) =>
        httpResource<OrgsGetImmutableReleasesSettingsRepositoriesResponse>(
          () => ({
            url: `${base}/orgs/${org}/settings/immutable-releases/repositories`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
