import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    repositoryId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET');

export function provideAgentsRemoveSelectedRepoFromOrgSecret(): FactoryProvider {
  return {
    provide: AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, secretName: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/agents/secrets/${secretName}/repositories/${repositoryId}`,
          method: 'DELETE',
        }));
    },
  };
}
