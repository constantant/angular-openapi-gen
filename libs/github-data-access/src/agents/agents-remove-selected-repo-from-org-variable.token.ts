import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    name: string,
    repositoryId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, name: string, repositoryId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/agents/variables/${name}/repositories/${repositoryId}`,
        method: 'DELETE',
      }));
  },
});
