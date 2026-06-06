import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_ENABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      repositoryId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ORGS_ENABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION');

export function provideOrgsEnableSelectedRepositoryImmutableReleasesOrganization(): FactoryProvider {
  return {
    provide: ORGS_ENABLE_SELECTED_REPOSITORY_IMMUTABLE_RELEASES_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/settings/immutable-releases/repositories/${repositoryId}`,
          method: 'PUT',
        }));
    },
  };
}
