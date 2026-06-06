import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MetaGetAllVersionsResponse =
  paths['/versions']['get']['responses']['200']['content']['application/json'];

export const META_GET_ALL_VERSIONS = new InjectionToken<
  () => ReturnType<typeof httpResource<MetaGetAllVersionsResponse>>
>('META_GET_ALL_VERSIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return () =>
      httpResource<MetaGetAllVersionsResponse>(() => ({
        url: `${base}/versions`,
      }));
  },
});
