import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsSetImmutableReleasesSettingsRepositoriesBody = NonNullable<
  paths['/orgs/{org}/settings/immutable-releases/repositories']['put']['requestBody']
>['content']['application/json'];

export const ORGS_SET_IMMUTABLE_RELEASES_SETTINGS_REPOSITORIES =
  new InjectionToken<
    (
      org: string,
      body:
        | OrgsSetImmutableReleasesSettingsRepositoriesBody
        | Signal<OrgsSetImmutableReleasesSettingsRepositoriesBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ORGS_SET_IMMUTABLE_RELEASES_SETTINGS_REPOSITORIES', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | OrgsSetImmutableReleasesSettingsRepositoriesBody
          | Signal<OrgsSetImmutableReleasesSettingsRepositoriesBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/settings/immutable-releases/repositories`,
          method: 'PUT',
          body,
        }));
    },
  });
