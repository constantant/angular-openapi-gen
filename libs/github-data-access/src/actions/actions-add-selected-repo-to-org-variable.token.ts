import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_ADD_SELECTED_REPO_TO_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    name: string,
    repositoryId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_ADD_SELECTED_REPO_TO_ORG_VARIABLE');

export function provideActionsAddSelectedRepoToOrgVariable(): FactoryProvider {
  return {
    provide: ACTIONS_ADD_SELECTED_REPO_TO_ORG_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, name: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/variables/${name}/repositories/${repositoryId}`,
          method: 'PUT',
        }));
    },
  };
}
