import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsListForReleaseParams =
  paths['/repos/{owner}/{repo}/releases/{release_id}/reactions']['get']['parameters']['query'];

export type ReactionsListForReleaseResponse =
  paths['/repos/{owner}/{repo}/releases/{release_id}/reactions']['get']['responses']['200']['content']['application/json'];

export const REACTIONS_LIST_FOR_RELEASE = new InjectionToken<
  (
    owner: string,
    repo: string,
    releaseId: string,
    params?:
      | ReactionsListForReleaseParams
      | (() => ReactionsListForReleaseParams | undefined),
  ) => ReturnType<typeof httpResource<ReactionsListForReleaseResponse>>
>('REACTIONS_LIST_FOR_RELEASE');

export function provideReactionsListForRelease(): FactoryProvider {
  return {
    provide: REACTIONS_LIST_FOR_RELEASE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        releaseId: string,
        params?:
          | ReactionsListForReleaseParams
          | (() => ReactionsListForReleaseParams | undefined),
      ) =>
        httpResource<ReactionsListForReleaseResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/releases/${releaseId}/reactions`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
