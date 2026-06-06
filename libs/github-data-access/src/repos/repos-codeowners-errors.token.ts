import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCodeownersErrorsParams =
  paths['/repos/{owner}/{repo}/codeowners/errors']['get']['parameters']['query'];

type ReposCodeownersErrorsResponse =
  paths['/repos/{owner}/{repo}/codeowners/errors']['get']['responses']['200']['content']['application/json'];

export const REPOS_CODEOWNERS_ERRORS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposCodeownersErrorsParams,
  ) => ReturnType<typeof httpResource<ReposCodeownersErrorsResponse>>
>('REPOS_CODEOWNERS_ERRORS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?: ReposCodeownersErrorsParams,
    ) =>
      httpResource<ReposCodeownersErrorsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/codeowners/errors`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
