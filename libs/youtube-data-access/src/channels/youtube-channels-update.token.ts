import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeChannelsUpdateBody = NonNullable<
  paths['/youtube/v3/channels']['put']['requestBody']
>['content']['application/json'];

export type YoutubeChannelsUpdateResponse =
  paths['/youtube/v3/channels']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_CHANNELS_UPDATE = new InjectionToken<
  (
    body: YoutubeChannelsUpdateBody | Signal<YoutubeChannelsUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubeChannelsUpdateResponse>>
>('YOUTUBE_CHANNELS_UPDATE');

export function provideYoutubeChannelsUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_CHANNELS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeChannelsUpdateBody | Signal<YoutubeChannelsUpdateBody>,
      ) =>
        httpResource<YoutubeChannelsUpdateResponse>(() => ({
          url: `${base}/youtube/v3/channels`,
          method: 'PUT',
          body,
          headers: {
            ...(oauth2?.() != null
              ? { Authorization: `Bearer ${oauth2!()}` }
              : {}),
            ...(oauth2c?.() != null
              ? { Authorization: `Bearer ${oauth2c!()}` }
              : {}),
          },
        }));
    },
  };
}
