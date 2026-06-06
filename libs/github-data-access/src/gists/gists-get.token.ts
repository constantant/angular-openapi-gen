import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsGetResponse =
  paths['/gists/{gist_id}']['get']['responses']['200']['content']['application/json'];

export const GISTS_GET = new InjectionToken<
  (gistId: string) => ReturnType<typeof httpResource<GistsGetResponse>>
>('GISTS_GET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (gistId: string) =>
      httpResource<GistsGetResponse>(() => ({
        url: `${base}/gists/${gistId}`,
      }));
  },
});
