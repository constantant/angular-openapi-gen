import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsCreateBody = NonNullable<
  paths['/gists']['post']['requestBody']
>['content']['application/json'];

export type GistsCreateResponse =
  paths['/gists']['post']['responses']['201']['content']['application/json'];

export const GISTS_CREATE = new InjectionToken<
  (
    body: GistsCreateBody | Signal<GistsCreateBody>,
  ) => ReturnType<typeof httpResource<GistsCreateResponse>>
>('GISTS_CREATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (body: GistsCreateBody | Signal<GistsCreateBody>) =>
      httpResource<GistsCreateResponse>(() => ({
        url: `${base}/gists`,
        method: 'POST',
        body,
      }));
  },
});
