import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeChannelSectionsInsertBody = NonNullable<
  paths['/youtube/v3/channelSections']['post']['requestBody']
>['content']['application/json'];

export type YoutubeChannelSectionsInsertResponse =
  paths['/youtube/v3/channelSections']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_CHANNEL_SECTIONS_INSERT = new InjectionToken<
  (
    body:
      | YoutubeChannelSectionsInsertBody
      | Signal<YoutubeChannelSectionsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeChannelSectionsInsertResponse>>
>('YOUTUBE_CHANNEL_SECTIONS_INSERT');

export function provideYoutubeChannelSectionsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_CHANNEL_SECTIONS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeChannelSectionsInsertBody
          | Signal<YoutubeChannelSectionsInsertBody>,
      ) =>
        httpResource<YoutubeChannelSectionsInsertResponse>(() => ({
          url: `${base}/youtube/v3/channelSections`,
          method: 'POST',
          body,
          headers: {
            ...(oauth2?.() != null
              ? { Authorization: `Bearer ${oauth2()}` }
              : {}),
            ...(oauth2c?.() != null
              ? { Authorization: `Bearer ${oauth2c()}` }
              : {}),
          },
        }));
    },
  };
}
