import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitListMatchingRefsResponse =
  paths['/repos/{owner}/{repo}/git/matching-refs/{ref}']['get']['responses']['200']['content']['application/json'];

export const GIT_LIST_MATCHING_REFS = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
  ) => ReturnType<typeof httpResource<GitListMatchingRefsResponse>>
>('GIT_LIST_MATCHING_REFS');

export function provideGitListMatchingRefs(): FactoryProvider {
  return {
    provide: GIT_LIST_MATCHING_REFS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, ref: string) =>
        httpResource<GitListMatchingRefsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/git/matching-refs/${ref}`,
        }));
    },
  };
}
