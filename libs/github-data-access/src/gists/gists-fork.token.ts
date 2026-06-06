import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsForkResponse =
  paths['/gists/{gist_id}/forks']['post']['responses']['201']['content']['application/json'];

export const GISTS_FORK = new InjectionToken<
  (gistId: string) => ReturnType<typeof httpResource<GistsForkResponse>>
>('GISTS_FORK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (gistId: string) =>
      httpResource<GistsForkResponse>(() => ({
        url: `${base}/gists/${gistId}/forks`,
        method: 'POST',
      }));
  },
});
