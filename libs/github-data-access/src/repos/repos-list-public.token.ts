import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListPublicParams =
  paths['/repositories']['get']['parameters']['query'];

export type ReposListPublicResponse =
  paths['/repositories']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_PUBLIC = new InjectionToken<
  (
    params?: ReposListPublicParams | (() => ReposListPublicParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListPublicResponse>>
>('REPOS_LIST_PUBLIC');

export function provideReposListPublic(): FactoryProvider {
  return {
    provide: REPOS_LIST_PUBLIC,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | ReposListPublicParams
          | (() => ReposListPublicParams | undefined),
      ) =>
        httpResource<ReposListPublicResponse>(() => ({
          url: `${base}/repositories`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
