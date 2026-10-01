import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeChannelSectionsDeleteParams =
  paths['/youtube/v3/channelSections']['delete']['parameters']['query'];

export const YOUTUBE_CHANNEL_SECTIONS_DELETE = new InjectionToken<
  (params: YoutubeChannelSectionsDeleteParams) => Observable<unknown>
>('YOUTUBE_CHANNEL_SECTIONS_DELETE');

export function provideYoutubeChannelSectionsDelete(): FactoryProvider {
  return {
    provide: YOUTUBE_CHANNEL_SECTIONS_DELETE,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (params: YoutubeChannelSectionsDeleteParams) =>
        http.request<unknown>('DELETE', `${base}/youtube/v3/channelSections`, {
          params: params as unknown as Record<
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
        });
    },
  };
}
