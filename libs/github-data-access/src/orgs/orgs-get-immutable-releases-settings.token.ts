import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetImmutableReleasesSettingsResponse =
  paths['/orgs/{org}/settings/immutable-releases']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET_IMMUTABLE_RELEASES_SETTINGS = new InjectionToken<
  (
    org: string,
  ) => ReturnType<typeof httpResource<OrgsGetImmutableReleasesSettingsResponse>>
>('ORGS_GET_IMMUTABLE_RELEASES_SETTINGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<OrgsGetImmutableReleasesSettingsResponse>(() => ({
        url: `${base}/orgs/${org}/settings/immutable-releases`,
      }));
  },
});
