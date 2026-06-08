import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsListCommentsParams =
  paths['/gists/{gist_id}/comments']['get']['parameters']['query'];

export type GistsListCommentsResponse =
  paths['/gists/{gist_id}/comments']['get']['responses']['200']['content']['application/json'];

export const GISTS_LIST_COMMENTS = new InjectionToken<
  (
    gistId: string,
    params?:
      | GistsListCommentsParams
      | (() => GistsListCommentsParams | undefined),
  ) => ReturnType<typeof httpResource<GistsListCommentsResponse>>
>('GISTS_LIST_COMMENTS');

export function provideGistsListComments(): FactoryProvider {
  return {
    provide: GISTS_LIST_COMMENTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        gistId: string,
        params?:
          | GistsListCommentsParams
          | (() => GistsListCommentsParams | undefined),
      ) =>
        httpResource<GistsListCommentsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/gists/${gistId}/comments`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
