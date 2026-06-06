import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetFilesFileParams =
  paths['/v1/files/{file}']['get']['parameters']['query'];

type GetFilesFileResponse =
  paths['/v1/files/{file}']['get']['responses']['200']['content']['application/json'];

export const GET_FILES_FILE = new InjectionToken<
  (
    file: string,
    params?: GetFilesFileParams,
  ) => ReturnType<typeof httpResource<GetFilesFileResponse>>
>('GET_FILES_FILE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (file: string, params?: GetFilesFileParams) =>
      httpResource<GetFilesFileResponse>(() => ({
        url: `${base}/v1/files/${file}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
