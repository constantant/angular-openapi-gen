import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetFilesParams = paths['/v1/files']['get']['parameters']['query'];

type GetFilesResponse =
  paths['/v1/files']['get']['responses']['200']['content']['application/json'];

export const GET_FILES = new InjectionToken<
  (params?: GetFilesParams) => ReturnType<typeof httpResource<GetFilesResponse>>
>('GET_FILES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetFilesParams) =>
      httpResource<GetFilesResponse>(() => ({
        url: `${base}/v1/files`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
