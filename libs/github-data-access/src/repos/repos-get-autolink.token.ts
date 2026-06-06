import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetAutolinkResponse =
  paths['/repos/{owner}/{repo}/autolinks/{autolink_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_AUTOLINK = new InjectionToken<
  (
    owner: string,
    repo: string,
    autolinkId: string,
  ) => ReturnType<typeof httpResource<ReposGetAutolinkResponse>>
>('REPOS_GET_AUTOLINK');

export function provideReposGetAutolink(): FactoryProvider {
  return {
    provide: REPOS_GET_AUTOLINK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, autolinkId: string) =>
        httpResource<ReposGetAutolinkResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/autolinks/${autolinkId}`,
        }));
    },
  };
}
