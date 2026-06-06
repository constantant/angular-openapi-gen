import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const GISTS_CHECK_IS_STARRED = new InjectionToken<
  (gistId: string) => ReturnType<typeof httpResource<unknown>>
>('GISTS_CHECK_IS_STARRED', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (gistId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/gists/${gistId}/star`,
      }));
  },
});
