import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideoCategoriesListParams =
  paths['/youtube/v3/videoCategories']['get']['parameters']['query'];

export type YoutubeVideoCategoriesListResponse =
  paths['/youtube/v3/videoCategories']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_VIDEO_CATEGORIES_LIST = new InjectionToken<
  (
    params?:
      | YoutubeVideoCategoriesListParams
      | (() => YoutubeVideoCategoriesListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeVideoCategoriesListResponse>>
>('YOUTUBE_VIDEO_CATEGORIES_LIST');

export function provideYoutubeVideoCategoriesList(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEO_CATEGORIES_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeVideoCategoriesListParams
          | (() => YoutubeVideoCategoriesListParams | undefined),
      ) =>
        httpResource<YoutubeVideoCategoriesListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/youtube/v3/videoCategories`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
            headers: {
              ...(oauth2?.() != null
                ? { Authorization: `Bearer ${oauth2()}` }
                : {}),
              ...(oauth2c?.() != null
                ? { Authorization: `Bearer ${oauth2c()}` }
                : {}),
            },
          };
        });
    },
  };
}
