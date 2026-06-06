import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MetaGetResponse =
  paths['/meta']['get']['responses']['200']['content']['application/json'];

export const META_GET = new InjectionToken<
  () => ReturnType<typeof httpResource<MetaGetResponse>>
>('META_GET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return () =>
      httpResource<MetaGetResponse>(() => ({
        url: `${base}/meta`,
      }));
  },
});
