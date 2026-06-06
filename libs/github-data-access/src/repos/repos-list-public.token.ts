import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListPublicParams =
  paths['/repositories']['get']['parameters']['query'];

type ReposListPublicResponse =
  paths['/repositories']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_PUBLIC = new InjectionToken<
  (
    params?: ReposListPublicParams,
  ) => ReturnType<typeof httpResource<ReposListPublicResponse>>
>('REPOS_LIST_PUBLIC', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (params?: ReposListPublicParams) =>
      httpResource<ReposListPublicResponse>(() => ({
        url: `${base}/repositories`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
