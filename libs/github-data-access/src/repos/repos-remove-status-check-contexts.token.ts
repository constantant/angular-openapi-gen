import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRemoveStatusCheckContextsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['delete']['requestBody']
>['content']['application/json'];

export type ReposRemoveStatusCheckContextsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['delete']['responses']['200']['content']['application/json'];

export const REPOS_REMOVE_STATUS_CHECK_CONTEXTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposRemoveStatusCheckContextsBody
      | Signal<ReposRemoveStatusCheckContextsBody>,
  ) => ReturnType<typeof httpResource<ReposRemoveStatusCheckContextsResponse>>
>('REPOS_REMOVE_STATUS_CHECK_CONTEXTS');

export function provideReposRemoveStatusCheckContexts(): FactoryProvider {
  return {
    provide: REPOS_REMOVE_STATUS_CHECK_CONTEXTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposRemoveStatusCheckContextsBody
          | Signal<ReposRemoveStatusCheckContextsBody>,
      ) =>
        httpResource<ReposRemoveStatusCheckContextsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
