import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeChannelBannersInsertBody = Blob | ArrayBuffer;

export type YoutubeChannelBannersInsertResponse =
  paths['/youtube/v3/channelBanners/insert']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  description:
    'A channel banner returned as the response to a channel_banner.insert call.',
  properties: {
    etag: {
      type: 'string',
    },
    kind: {
      default: 'youtube#channelBannerResource',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#channelBannerResource".',
      type: 'string',
    },
    url: {
      description: 'The URL of this banner image.',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(
  value: unknown,
): YoutubeChannelBannersInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeChannelBannersInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeChannelBannersInsertResponse;
}

export const YOUTUBE_CHANNEL_BANNERS_INSERT = new InjectionToken<
  (
    body: YoutubeChannelBannersInsertBody,
  ) => Observable<YoutubeChannelBannersInsertResponse>
>('YOUTUBE_CHANNEL_BANNERS_INSERT');

export function provideYoutubeChannelBannersInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_CHANNEL_BANNERS_INSERT,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (body: YoutubeChannelBannersInsertBody) =>
        http
          .request<YoutubeChannelBannersInsertResponse>(
            'POST',
            `${base}/youtube/v3/channelBanners/insert`,
            {
              body,
              headers: {
                ...(oauth2?.() != null
                  ? { Authorization: `Bearer ${oauth2()}` }
                  : {}),
                ...(oauth2c?.() != null
                  ? { Authorization: `Bearer ${oauth2c()}` }
                  : {}),
              },
            },
          )
          .pipe(map(_validateResponse));
    },
  };
}
