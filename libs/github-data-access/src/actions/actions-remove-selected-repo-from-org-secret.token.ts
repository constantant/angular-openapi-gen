import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    repositoryId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_REMOVE_SELECTED_REPO_FROM_ORG_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, secretName: string, repositoryId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/actions/secrets/${secretName}/repositories/${repositoryId}`,
        method: 'DELETE',
      }));
  },
});
