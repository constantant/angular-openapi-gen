import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const DEPENDABOT_ADD_SELECTED_REPO_TO_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    repositoryId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('DEPENDABOT_ADD_SELECTED_REPO_TO_ORG_SECRET');

export function provideDependabotAddSelectedRepoToOrgSecret(): FactoryProvider {
  return {
    provide: DEPENDABOT_ADD_SELECTED_REPO_TO_ORG_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, secretName: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/dependabot/secrets/${secretName}/repositories/${repositoryId}`,
          method: 'PUT',
        }));
    },
  };
}
