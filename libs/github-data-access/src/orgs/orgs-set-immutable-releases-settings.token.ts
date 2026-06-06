import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsSetImmutableReleasesSettingsBody = NonNullable<
  paths['/orgs/{org}/settings/immutable-releases']['put']['requestBody']
>['content']['application/json'];

export const ORGS_SET_IMMUTABLE_RELEASES_SETTINGS = new InjectionToken<
  (
    org: string,
    body:
      | OrgsSetImmutableReleasesSettingsBody
      | Signal<OrgsSetImmutableReleasesSettingsBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_SET_IMMUTABLE_RELEASES_SETTINGS');

export function provideOrgsSetImmutableReleasesSettings(): FactoryProvider {
  return {
    provide: ORGS_SET_IMMUTABLE_RELEASES_SETTINGS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | OrgsSetImmutableReleasesSettingsBody
          | Signal<OrgsSetImmutableReleasesSettingsBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/settings/immutable-releases`,
          method: 'PUT',
          body,
        }));
    },
  };
}
