import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeChannelSectionsUpdateBody = NonNullable<
  paths['/youtube/v3/channelSections']['put']['requestBody']
>['content']['application/json'];

export type YoutubeChannelSectionsUpdateResponse =
  paths['/youtube/v3/channelSections']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_CHANNEL_SECTIONS_UPDATE = new InjectionToken<
  (
    body:
      | YoutubeChannelSectionsUpdateBody
      | Signal<YoutubeChannelSectionsUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubeChannelSectionsUpdateResponse>>
>('YOUTUBE_CHANNEL_SECTIONS_UPDATE');

export function provideYoutubeChannelSectionsUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_CHANNEL_SECTIONS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeChannelSectionsUpdateBody
          | Signal<YoutubeChannelSectionsUpdateBody>,
      ) =>
        httpResource<YoutubeChannelSectionsUpdateResponse>(() => ({
          url: `${base}/youtube/v3/channelSections`,
          method: 'PUT',
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
