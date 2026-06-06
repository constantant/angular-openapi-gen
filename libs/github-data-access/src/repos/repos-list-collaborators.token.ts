import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListCollaboratorsParams =
  paths['/repos/{owner}/{repo}/collaborators']['get']['parameters']['query'];

type ReposListCollaboratorsResponse =
  paths['/repos/{owner}/{repo}/collaborators']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_COLLABORATORS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListCollaboratorsParams,
  ) => ReturnType<typeof httpResource<ReposListCollaboratorsResponse>>
>('REPOS_LIST_COLLABORATORS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?: ReposListCollaboratorsParams,
    ) =>
      httpResource<ReposListCollaboratorsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/collaborators`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
