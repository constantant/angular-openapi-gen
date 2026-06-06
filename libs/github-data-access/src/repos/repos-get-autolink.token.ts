import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetAutolinkResponse =
  paths['/repos/{owner}/{repo}/autolinks/{autolink_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_AUTOLINK = new InjectionToken<
  (
    owner: string,
    repo: string,
    autolink_id: string,
  ) => ReturnType<typeof httpResource<ReposGetAutolinkResponse>>
>('REPOS_GET_AUTOLINK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, autolink_id: string) =>
      httpResource<ReposGetAutolinkResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/autolinks/${autolink_id}`,
      }));
  },
});
