import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export const YOUTUBE_COMMENTS_SET_MODERATION_STATUS = new InjectionToken<
  () => ReturnType<typeof httpResource<unknown>>
>('YOUTUBE_COMMENTS_SET_MODERATION_STATUS');

export function provideYoutubeCommentsSetModerationStatus(): FactoryProvider {
  return {
    provide: YOUTUBE_COMMENTS_SET_MODERATION_STATUS,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return () =>
        httpResource<unknown>(() => ({
          url: `${base}/youtube/v3/comments/setModerationStatus`,
          method: 'POST',
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
