import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetReleaseByTagResponse =
  paths['/repos/{owner}/{repo}/releases/tags/{tag}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_RELEASE_BY_TAG = new InjectionToken<
  (
    owner: string,
    repo: string,
    tag: string,
  ) => ReturnType<typeof httpResource<ReposGetReleaseByTagResponse>>
>('REPOS_GET_RELEASE_BY_TAG');

export function provideReposGetReleaseByTag(): FactoryProvider {
  return {
    provide: REPOS_GET_RELEASE_BY_TAG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, tag: string) =>
        httpResource<ReposGetReleaseByTagResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/releases/tags/${tag}`,
        }));
    },
  };
}
