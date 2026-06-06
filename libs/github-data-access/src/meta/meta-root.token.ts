import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MetaRootResponse =
  paths['/']['get']['responses']['200']['content']['application/json'];

export const META_ROOT = new InjectionToken<
  () => ReturnType<typeof httpResource<MetaRootResponse>>
>('META_ROOT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return () =>
      httpResource<MetaRootResponse>(() => ({
        url: `${base}/`,
      }));
  },
});
