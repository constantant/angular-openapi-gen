import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EmojisGetResponse =
  paths['/emojis']['get']['responses']['200']['content']['application/json'];

export const EMOJIS_GET = new InjectionToken<
  () => ReturnType<typeof httpResource<EmojisGetResponse>>
>('EMOJIS_GET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return () =>
      httpResource<EmojisGetResponse>(() => ({
        url: `${base}/emojis`,
      }));
  },
});
